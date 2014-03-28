angular.module('starter.services', [])

/**
 * Get the Users Information
 */
.factory('Me', function($http) {
  return {
    fetch: function ( ) {
      var user_id = localStorage["user_id"];

      return $http.get("http://localhost:8080/user/info?user_id=" + user_id);
    },
    ok: function ( ) {
      var user_id = localStorage["user_id"];

      if (Number.isNaN(user_id)) {
        return false;
      }

      return true;
    },
    get: function(user_id) {
      // Simple index lookup
      return $http.get("http://localhost:8080/user/info?user_id=" + user_id);
    }
  };

})

/**
 * Get all the users in the organization
 */
.factory('Group', function($http) {
  return {
    ok: function ( ) {
      var group_id = localStorage["current_group"];
      var access_token = localStorage["access_token"];

      if (Number.isNaN(group_id) || !access_token) {
        return false;
      }

      return true;
    },
    fetch: function ( ) {
      var group_id = localStorage["group_id"];
      var access_token = localStorage["access_token"];

      return $http.get("http://localhost:8080/user/info?group_id=" + group_id + "&access_token=" + access_token);
    }
  };
});

