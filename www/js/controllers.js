angular.module('starter.controllers', [])


.controller('TabCtrl', function($scope, Me, $timeout) {
  $scope.me = Me.fetch();
})

.controller('MeCtrl', function($scope, Me, $timeout) {
  $scope.user = Me.fetch();
})

.controller('ExchangeCtrl', function($scope, Group) {
  $scope.group = Group.all();
})

.controller('TransactionCtrl', function($scope, $stateParams, Group) {
  $scope.user = Group.get($stateParams.userID);
  $scope.number = 0;
  $scope.increment = function(number){
    $scope.number = $scope.number + number;
  };
})

.controller('ActivityCtrl', function($scope, Activity) {
  $scope.activities = Activity.all();
})

.controller('ActivityDetailCtrl', function($scope, $stateParams, Activity) {
  $scope.activity = Activity.get($stateParams.activityId);
});
