angular.module('app.filters', [])

.filter('otherUsers', function(Cache, _) {
  return function(users) {
    _.remove(users, function(user) { return user.user_id === Cache.me().user_id; });
    return users;
  };
})

.filter('absolute', function() {
  return function(value) {
    return Math.abs(value);
  };
})

.filter('pluralizer', function() {
  return function(value) {
    if ( value == 1 || value == -1 ){
      return '';
    } else {
      return 's';
    }
  };
});