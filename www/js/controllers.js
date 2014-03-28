angular.module('starter.controllers', [])

.controller('MeCtrl', function($scope, Me) {
  if (Me.ok()) {
    Me.fetch().success(function(data) {
      $scope.user = data;
    });
  }
})

.controller('ExchangeCtrl', function($scope, Group) {
  if (Group.ok()) {
    Group.fetch().success(function(data) {
      $scope.group = data;
    });
  }
})

.controller('GroupDetailCtrl', function($scope, $stateParams, Group) {
  if (Group.ok()) {
    Group.fetch().success(function(data) {
      $scope.group = data;
    });
  }
});

