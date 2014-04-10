angular.module('starter.controllers', [])

.controller('MeCtrl', function($scope, Cache, Balance, $ionicSideMenuDelegate, $ionicNavBarDelegate) {
  $scope.getCachedState();

  $ionicNavBarDelegate.$getByHandle('nav-bar').showBar(false);

  var menu = $ionicSideMenuDelegate.$getByHandle('menu');

  menu.canDragContent(true);

  $scope.me = Cache.me();
  $scope.group = Cache.getCurrentGroup();

  $scope.$emit("groups.update");

  $scope.$on("group.changed", function(){
    $scope.$emit("groups.update");
    $scope.group = Cache.getCurrentGroup();
  });

  $scope.openMenu = function(){
    menu.toggleLeft();

    if(!menu.isOpenLeft()){
      $scope.$emit("menu.opened");
    }
  };
})

.controller('ExchangeCtrl', function($scope, Cache, Users, $timeout) {
  $scope.users = Cache.users();

  $scope.refreshing = false;

  $scope.refresh = function() {
    console.log("refresh");
    $scope.refreshing = true;
    Users.all().then(function(users) {
      $scope.refreshing = false;
      $scope.users = users;
    });
  };

  $scope.refresh();
})

.controller('TransactionCtrl', function($scope, $interval, $state, $stateParams,Transactions, Users, Cache) {
  $scope.disabled = false;
  $scope.user_id = parseInt($stateParams.userId, 10);
  $scope.user = Cache.getUser($scope.user_id);
  $scope.amount = 0;
  $scope.group_id = Cache.currentGroupId();
  $scope.send_location = true;
  $scope.note = "";

  $scope.sendTransaction = function(params){
    Transactions.create(params).then(function(response){
      $state.go('tab.me');
      $scope.disabled = false;
    });
  };

  $scope.createTransaction = function(){
    $scope.disabled = true;

    var params = {
      user_id: $scope.user_id,
      group_id: Cache.currentGroupId(),
      amount: $scope.amount
    };

    if($scope.note){
      params.note = $scope.note;
    }

    if($scope.send_location) {
      navigator.geolocation.getCurrentPosition(function(position){
        params.latitude = position.coords.latitude;
        params.longitude = position.coords.longitude;
        params.accuracy = position.coords.accuracy;
        params.location_date = position.coords.timestamp;
        $scope.sendTransaction(params);
      }, function(){
        $scope.sendTransaction(params);
      });
    } else {
      $scope.sendTransaction(params);
    }
  };

  $scope.increment = function(){
    $scope.amount++;
  };

  $scope.deincrement = function(){
    $scope.amount--;
  };
})

.controller('GroupDetailCtrl', function($scope, Group) {
  Group.fetch().success(function(data) {
    $scope.group = data;
  });
})

.controller('AuthCtrl', function($scope, Session, $state) {
  $scope.startAuth = function(){
    window.open("https://api.coffeetime.io/1/auth", "_system");
  };
})

.controller('AppCtrl', function($rootScope, $scope, Session, Cache, Groups, Balance, $timeout, $ionicSideMenuDelegate){

  $scope.$hasFooter = false;
  $scope.selectedGroup = Cache.currentGroupId();
  $scope.groups = Cache.groups();
  $scope.refreshing = false;

  $scope.getCachedState = function () {
    if(Cache.getCurrentGroup()){
      $scope.lastUpdate = Cache.lastUpdate();
      $scope.user_balance = Cache.getCurrentGroup().user_balance;
      $scope.min_balance = Cache.getCurrentGroup().min_balance;
      $scope.max_balance = Cache.getCurrentGroup().min_balance;
    } else {
      $scope.lastUpdate = false;
      $scope.user_balance = 0;
      $scope.min_balance = 0;
      $scope.max_balance = 0;
    }
  };

  $scope.changeGroups = function(id){
    $scope.selectedGroup = id;
    Cache.currentGroupId(id);
    $scope.getCachedState();
    Groups.info(id).then(function(){
      $scope.$broadcast("group.changed");
      $ionicSideMenuDelegate.$getByHandle('menu').toggleLeft(false);
    });
  };

  $scope.signOut = function(){
    $ionicSideMenuDelegate.$getByHandle('menu').toggleLeft(false);
    Session.signOut();
  };

  $scope.updateGroups = function() {
    console.log("updateGroups");
    $scope.selectedGroup = Cache.currentGroupId();
    Groups.all().then(function(groups){
      $scope.groups = groups;
    });
  };

  $scope.refresh = function() {
    $scope.refreshing = true;
    Balance.fetch().then(function(balance) {
      $scope.lastUpdate = Cache.lastUpdate(new Date());
      $scope.refreshing = false;
      $scope.user_balance = balance.user_balance;
      $scope.min_balance = balance.min_balance;
      $scope.max_balance = balance.max_balance;
    });
  };

  $scope.getCachedState();
  $scope.refresh();

  $scope.$on('balance.update', $scope.refresh);
  $scope.$on('groups.update', $scope.updateGroups);
})

.controller('ActivityCtrl', function($scope, Transactions, Cache){
  $scope.transactions = Cache.transactions();

  Transactions.fetch().then(function(transactions){
    $scope.transactions = transactions;
  });

  $scope.avatarForTransaction = function(transaction){
    if(Cache.me().user_id === transaction.from_user_id){
      return Cache.getUser(transaction.to_user_id).avatar_url;
    }
    if(Cache.me().user_id === transaction.to_user_id){
      return Cache.getUser(transaction.from_user_id).avatar_url;
    }
  };

  $scope.nameForTransaction = function(transaction){
    if(Cache.me().user_id === transaction.from_user_id){
      return Cache.getUser(transaction.to_user_id).display_name;
    }
    if(Cache.me().user_id === transaction.to_user_id){
      return Cache.getUser(transaction.from_user_id).display_name;
    }
  };

  $scope.refreshing = false;

  $scope.refresh = function() {
    $scope.refreshing = true;
    Transactions.fetch().then(function(transactions){
      $scope.refreshing = false;
      $scope.transactions = transactions;
    });
  };

  $scope.refresh();
})

.controller('ActivityDetailCtrl', function($scope, $stateParams, Cache, Transactions) {

  $scope.transaction = Cache.getTransaction(parseInt($stateParams.transactionId, 10));

  $scope.isTransactionDebt = function(){
    return Cache.me().user_id === $scope.transaction.to_user_id;
  };

  $scope.nameForTransaction = function(transaction){
    if(Cache.me().user_id === transaction.from_user_id){
      return Cache.getUser(transaction.to_user_id).display_name;
    }
    if(Cache.me().user_id === transaction.to_user_id){
      return Cache.getUser(transaction.from_user_id).display_name;
    }
  };

  $scope.tranactionCreator = function(transaction){
    return Cache.getUser(transaction.from_user_id).display_name;
  };

  $scope.from_user = Cache.getUser($scope.transaction.from_user_id);
  $scope.to_user = Cache.getUser($scope.transaction.to_user_id);
  $scope.avatar_url = (Cache.me().user_id === $scope.transaction.to_user_id) ? $scope.from_user.avatar_url : $scope.from_user.avatar_url;

});