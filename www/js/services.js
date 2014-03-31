angular.module('starter.services', [])

.factory('Session', function($http, $state){
  var user_id = localStorage.user_id;
  var group_id = localStorage.current_group;
  var access_token = localStorage.access_token;

  if(!user_id || !access_token){
    $state.go("auth");
  }

  return {
    user_id: function () {
      return localStorage.user_id;
    },
    token: function() {
      return localStorage.access_token;
    },
    group: function(){
      return localStorage.current_group;
    },
    switchGroup: function (newGroup) {
      if (newGroup) {
        localStorage.current_group = newGroup();
      }

      $state.go('tab.me');
    },
    authenticate: function() {
      $state.go("auth");
    },
    signIn: function () {
      return $http.get("http://localhost:8080/auth").success(function(data, status, headers, config){
        localStorage.access_token = data.access_token;
        localStorage.user_id = data.user_id;
      });
    },
    signOut: function() {
      localStorage.clear();
      this.authenticate();
    }
  };
})

/**
 * Get the Users Information
 */
.factory('Me', function($http, Session) {
  return {
    fetch: function ( ) {
      return $http.get("http://localhost:8080/user/info?user_id=" + Session.user_id());
    }
  };

})

/**
 * Get all the users in the organization
 */

.factory('Group', function($http, Session) {
  return {
    fetch: function ( ) {
      return $http.get("http://localhost:8080/group/info");
    },
    usersById: function(){
      return $http.get("http://localhost:8080/group/info").then(function(data){
        var users = {};
        for (var i = data.data.users.length - 1; i >= 0; i--) {
          var user = data.data.users[i];
          var id = user.user_id;
          users[id] = user;
        }
        return users;
      });
    }
  };
});
