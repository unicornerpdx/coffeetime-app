angular.module('starter.controllers', [])

.controller('MeCtrl', function($scope, Me) {
  Me.fetch().success(function(data) {
    $scope.user = data;
  });
})

.controller('ExchangeCtrl', function($scope, Group) {
  Group.fetch().success(function(data) {
    $scope.group = data;
  });
})

.controller('GroupDetailCtrl', function($scope, Group) {
  Group.fetch().success(function(data) {
    $scope.group = data;
  });
});