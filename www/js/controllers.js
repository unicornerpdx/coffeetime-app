angular.module('starter.controllers', [])

.controller('MeCtrl', function($scope) {
  console.log("Me Page");
})

.controller('ExchangeCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
  console.log("Exchange Page");
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('ActivityCtrl', function($scope, Activity) {
  $scope.activities = Activity.all();
  console.log(Activity);
})

.controller('ActivityDetailCtrl', function($scope, $stateParams, Activity) {
  $scope.activity = Activity.get($stateParams.activityId);
});
