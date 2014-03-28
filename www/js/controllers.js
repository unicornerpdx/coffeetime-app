angular.module('starter.controllers', [])

.controller('MeCtrl', function($scope, Me, $timeout) {
  $scope.user = Me.fetch();

  // User Debt/Credit Switcher
  //
  // $timeout(function(){
  //   $scope.user.amount = 20;
  // }, 100);

  // $timeout(function(){
  //   $scope.user.amount = 0;
  // }, 2000);

  // $timeout(function(){
  //   $scope.user.amount = -10;
  // }, 3000);

  // $timeout(function(){
  //   $scope.user.amount = -5;
  // }, 4000);

  // $timeout(function(){
  //   $scope.user.amount = 8;
  // }, 5000);
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
