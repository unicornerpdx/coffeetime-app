angular.module('starter.controllers', [])

.controller('MeCtrl', function($scope, Me) {
  $scope.user = Me.fetch();
  $scope.Math = window.Math;
})

.controller('ExchangeCtrl', function($scope, Group) {
  $scope.group = Group.all();
})

.controller('GroupDetailCtrl', function($scope, $stateParams, Group) {
  $scope.user = Group.get($stateParams.userID);
})

.controller('ActivityCtrl', function($scope, Activity) {
  $scope.activities = Activity.all();
})

.controller('ActivityDetailCtrl', function($scope, $stateParams, Activity) {
  $scope.activity = Activity.get($stateParams.activityId);
});
