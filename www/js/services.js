angular.module('starter.services', [])

.factory('Session', function($http, $stateProvider){
  var userId = localStorage.userId;
  var groupId = localStorage.currentGroup;
  var accessToken = localStorage.accessToken;

  if(!userId || !accessToken){
    $stateProvider.go("auth");
  }

  if(userId && accessToken && !groupId){
    $stateProvider.go("groups");
  }

  return {
    userId: function () {
      return localStorage.userId;
    },
    token: function() {
      return localStorage.accessToken;
    },
    group: function(){
      return localStorage.currentGroup;
    },
    switchGroup: function (newGroup) {
      if (newGroup) {
        localStorage.currentGroup = newGroup();
      }

      $stateProvider.go('tab.me');
    },
    authenticate: function() {
      $stateProvider.go("auth");
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
      return $http.get("http://localhost:8080/user/info?userId=" + Session.userId());
    }
  };

})

/**
 * Get all the users in the organization
 */
.factory('Group', function($http, Session) {
  return {
    fetch: function ( ) {
      return $http.get("http://localhost:8080/user/info?groupId=" + Session.group() + "&accessToken=" + Session.token());
    }
  };
});