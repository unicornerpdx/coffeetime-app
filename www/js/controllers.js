angular.module('starter.controllers', [])

.controller('MeCtrl', function($scope, Me) {
  console.log("Me Page");
  $scope.user = Me.fetch();
})

.controller('ExchangeCtrl', function($scope, Group) {
  $scope.group = Group.all();
  console.log("Exchange Page");
})

.controller('GroupDetailCtrl', function($scope, $stateParams, Group) {
  $scope.user = Group.get($stateParams.userID);
})

.controller('ActivityCtrl', function($scope, Activity) {
  $scope.activities = Activity.all();
  console.log(Activity);
})

.controller('ActivityDetailCtrl', function($scope, $stateParams, Activity) {
  $scope.activity = Activity.get($stateParams.activityId);
});
