angular.module('starter.controllers', [])

.controller('MeCtrl', function($scope, Me, Group) {
  Group.fetch().success(function(data) {
    $scope.group = data;
    $scope.minDebt = 30;
    $scope.maxDebt = 30;
  });

  Me.fetch().success(function(data) {
    $scope.me = data;
    $scope.balance = data.user_balance;
  });
})

.controller('ColorCtrl', function($scope, Me, $timeout) {

})

.controller('TabCtrl', function($scope, Me, $timeout) {

  $scope.me = Me.fetch();
})

.controller('ExchangeCtrl', function($scope, Group) {
  Group.fetch().success(function(data) {
    $scope.group = data.users;
  });
})

.controller('TransactionCtrl', function($scope, $stateParams, Group) {
  $scope.user = Group.get($stateParams.userID);
  $scope.number = 0;
  $scope.increment = function(number){
    $scope.number = $scope.number + number;
  };
})

.controller('GroupDetailCtrl', function($scope, Group) {
  Group.fetch().success(function(data) {
    $scope.group = data;
  });
})

.controller('AuthCtrl', function($scope, Session, $state) {
  $scope.signIn = function(){
    Session.signIn().success(function(){
      $state.go("tab.me");
    });
  };
})

.controller('AppCtrl', function($scope, Session, Group, Me, $ionicSideMenuDelegate){
  $ionicSideMenuDelegate.$getByHandle('side-menu').canDragContent(false);
  Me.fetch().success(function(data) {
    $scope.me = data;
  });
})

.controller('ActivityCtrl', function($scope, Group){
  Group.fetch().success(function(data){
    $scope.transactions = data.transactions;
  });

  Group.usersById().then(function(data){
    console.log(data);
    $scope.users = data;
  });
});
