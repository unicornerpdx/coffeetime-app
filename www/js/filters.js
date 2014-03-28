angular.module('app.filters', [])

.filter('absolute', function() {
  return function(value) {
    return Math.abs(value);
  };
})

.filter('date.relative', function() {
  return function() {
    return Math.abs(value);
  };
});

