
angular.module('starter.services', [])

.factory('TinyStore', function(){
  return window.TinyStore;
})

.factory('_', function(){
  return window._;
})

.factory('UUID', function(){
  return function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
})

.factory('Session', function(Config, UUID, _, $ionicPlatform, $http, $state, Cache){
  if(!Cache.token()){
    $state.go('auth', {
      location: "replace"
    });
  } else {
    $state.go('tab.me', {
      location: "replace"
    });
  }

  function updateTokens() {
    function pushError(){
      navigator.notification.alert('something undebuggable happened');
    }

    function androidHandler(result){
      navigator.notification.alert('result = ' + result);
    }

    function iosHandler(result){
      var uuid = Cache.uuid() || Cache.uuid(UUID());
      console.log("iOS Push Token: " + result);
      console.log("Device UUIS: " + uuid);
      $http.post(Config.server + "device/register", {
        uuid: uuid,
        token: result,
        token_type: 'apns_production'
      }).error(pushError);
    }

    if(window.plugins && window.plugins.pushNotification) {

      if($ionicPlatform.is('android')){
        navigator.notification.alert('registering for push');
        window.plugins.pushNotification.register(androidHandler, pushError, {
          "senderID": "470253609765",
          "ecb": "onNotificationGCM"
        });
      }

      if($ionicPlatform.is('ios')){
        window.plugins.pushNotification.register(iosHandler, pushError, {
          "badge":"true",
          "sound":"true",
          "alert":"true",
          "ecb":"onNotificationAPN"
        });
      }
    }
  }

  return {
    registerAndroidToken: function (regid) {
      navigator.notification.alert('registering token');
      var uuid = Cache.uuid() || Cache.uuid(UUID());
      $http.post(Config.server + "device/register", {
        uuid: uuid,
        token: regid,
        token_type: 'gcm'
      }).error(function (argument) {
        navigator.notification.alert('device/register error');
      }).success(function (data) {
        navigator.notification.alert('registration ok');
      });
    },
    sendPushTokens: function(){
      updateTokens();
    },
    switchGroup: function (groupId) {
      $state.go('tab.me');
    },
    finishAuth: function (code) {
      return $http.post(Config.server + 'auth', {
        code: code
      }).then(function(response){
        var user = response.data;
        $http.defaults.headers.common.Authorization = 'Bearer ' + user.access_token;

        Cache.token(user.access_token);

        Cache.me({
          user_id: user.user_id,
          username: user.username,
          display_name: user.display_name,
          avatar_url: user.avatar_url
        });

        updateTokens();

        return user.access_token;
      }).then(function(access_token){
        return $http.get(Config.server + 'group/list');
      }).then(function(response){
        var groups = _.sortBy(response.data.groups, 'group_id');
        Cache.groups(groups);
        if (groups.length) {
          Cache.currentGroupId(groups[0].group_id);
          $state.go('tab.me', {
            location: "replace"
          });
        } else {
          $state.go('teams', {
            location: "replace"
          });
        }
      });
    },
    signOut: function() {
      Cache.clear();
      $state.go('auth', {
        location: "replace"
      });
    }
  };
})

.factory('Cache', function($rootScope, $http, TinyStore, _){
  var store = new TinyStore('coffee');

  function cache(key,  value){
    if(value){
      store.set(key, value);
    }
    return store.get(key);
  }

  return {
    lastUpdate: function(update){
      return cache('lastUpdate', update);
    },
    uuid: function(update){
      return cache('uuid', update);
    },
    users: function(update){
      return cache('users', update);
    },
    getUser: function(id){
      return _.find(cache('users'), { 'user_id': id });
    },

    groups: function(update){
      return cache('groups', update);
    },
    getGroup: function(id){
      return _.find(cache('groups'), { 'group_id': id });
    },
    currentGroupId: function(id){
      return cache("currentGroupId", id);
    },
    getCurrentGroup: function(id){
      return _.find(cache('groups'), { 'group_id': cache("currentGroupId") });
    },

    transactions: function(update){
      return cache('transactions', update);
    },
    getTransaction: function(id){
      return _.find(cache('transactions'), { 'transaction_id': id });
    },

    me: function(update){
      return cache('me', update);
    },
    token: function(update){
      $http.defaults.headers.common.Authorization = 'Bearer ' + cache('token', update);
      return cache('token', update);
    },

    update: function(groupInfo){
      cache('transactions', groupInfo.transactions);
      cache('users', groupInfo.users);
      var groups = _.sortBy(cache("groups"), 'group_id');
      for (var i = groups.length - 1; i >= 0; i--) {
        var group = groups[i];
        if(group.group_id === groupInfo.group_id){
          group = {
            group_name: groupInfo.group_name,
            timezone: groupInfo.timezone,
            group_id: groupInfo.group_id,
            user_balance: groupInfo.user_balance,
            min_balance: groupInfo.min_balance,
            max_balance: groupInfo.max_balance
          };
        }
      }
      cache('groups', groups);
      if(groupInfo.user_balance > 0 && window.plugins){
        window.plugins.pushNotification.setApplicationIconBadgeNumber(function(){}, function(){}, Math.abs(groupInfo.user_balance));
      }
    },

    clear: function(){
      store.clear();
    }
  };
})

.factory('Users', function($http, Groups, Config, Session, Cache){
  return {
    all: function(){
      return Groups.current().then(function(response){
        Cache.update(response.data);
        return response.data.users;
      });
    }
  };
})

.factory('Groups', function($http, Config, Session, Cache){
  return {
    all: function(){
      return $http.get(Config.server + 'group/list').then(function(response){
        Cache.groups(response.data.groups);
        return response.data.groups;
      });
    },
    info: function(id){
      return $http.get(Config.server + 'group/info', {
        params: {
          group_id: id
        }
      }).then(function(response){
        Cache.update(response.data);
        return response;
      });
    },
    current: function(){
      return $http.get(Config.server + 'group/info', {
        params: {
          group_id: Cache.currentGroupId()
        }
      }).then(function(response){
        Cache.update(response.data);
        return response;
      });
    }
  };
})

.factory('Transactions', function($http, Groups, Config, Session, Cache){
  return {
    fetch: function(){
      // @TODO get transactions for current group id
      return Groups.current().then(function(response){
        Cache.update(response.data);
        return response.data.transactions;
      });
    },
    create: function(params){
      var data = {};

      data.user_id = params.user_id;
      data.group_id = params.group_id;
      data.amount = params.amount;

      if(params.note){
        data.note = params.note;
      }

      if(params.latitude){
        data.latitude = params.latitude;
      }

      if(params.longitude){
        data.longitude = params.longitude;
      }

      if(params.accuracy){
        data.accuracy = params.accuracy;
      }

      if(params.location_date){
        data.location_date = params.location_date;
      }

      return $http.post(Config.server + 'transaction/create', params).then(function(response){
        Cache.update(response.data);
        return response;
      });
    }
  };
})

.factory('Balance', function($http, Groups, Cache){
  return {
    fetch: function(){
      return Groups.current().then(function(response){
        Cache.update(response.data);
        return {
          user_balance: response.data.user_balance,
          max_balance: response.data.max_balance,
          min_balance: response.data.min_balance
        };
      });
    }
  };
});