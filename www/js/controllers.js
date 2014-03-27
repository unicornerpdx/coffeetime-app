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

.controller('AccountCtrl', function($scope) {
});
