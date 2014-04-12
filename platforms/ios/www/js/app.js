var openedWithURL;

window.StatusBar = window.StatusBar || {
  styleLightContent: function(){
    console.log("LightStatusBar");
  },
  styleDefault: function() {
    console.log("styleDefault");
  }
};

function handleOpenURL(url){
  // coffeetime://transaction?group_id=123&transaction_id=123
  var code = url.match(/code=(.+)/)[1];
  angular.element(document.body).injector().invoke(function(Session){
    Session.finishAuth(code);
  });
}

function onNotificationGCM(e){
  console.log(e);
  switch( e.event ){
  case 'registered':
    console.log("regID = " + e.regid);
    angular.element(document.body).injector().invoke(function(Session){
      Session.registerAndroidToken(e.regid);
    });
    break;

  case 'message':
    if (e.foreground){
      // foreground
    } else {
      // from notifcations
      if ( e.coldstart ){
        // cold start
      } else {
        // warm start
      }
    }
    console.log('msg', e.payload.message);
    break;

  case 'error':
    console.log('error', e.msg);
    break;

  default:
    console.log('unknown');
    break;
  }
}

function onNotificationAPN(e){
  angular.element(document.body).injector().invoke(function($state){
    $state.go("tab.activity-detail", {
      transactionId: parseInt(e.transaction_id, 10)
    });
  });

  if (e.badge){
    window.plugins.pushNotification.setApplicationIconBadgeNumber(function(){}, function(){}, e.badge);
  }
}

// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'app.filters', 'app.directives', 'angularMoment'])

.value("Config", {
  server: "https://api.coffeetime.io/1/"
})

.run(function(Session, Cache, $ionicPlatform){
  $ionicPlatform.ready(function() {
    window.StatusBar.styleLightContent();

    // Register for push here if user is logged in.
    if(Cache.me()){
      Session.sendPushTokens();
    }
  });

})

.run(function ($rootScope, $ionicSideMenuDelegate) {
  var menu = $ionicSideMenuDelegate.$getByHandle('menu');
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if(toState.name === "tab.me"){
      menu.canDragContent(true);
    } else {
      menu.canDragContent(false);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  var store = new TinyStore('coffee');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.me', {
      url: '/me',
      views: {
        'tab-me': {
          templateUrl: 'templates/tab-me.html',
          controller: 'MeCtrl'
        }
      }
    })

    .state('tab.exchange', {
      url: '/exchange',
      views: {
        'tab-exchange': {
          templateUrl: 'templates/tab-exchange.html',
          controller: 'ExchangeCtrl'
        }
      }
    })
    .state('tab.coffee-transaction', {
      url: '/exchange/:userId',
      views: {
        'tab-exchange': {
          templateUrl: 'templates/coffee-transaction.html',
          controller: 'TransactionCtrl'
        }
      }
    })

    .state('tab.activity', {
      url: '/activity',
      views: {
        'tab-activity': {
          templateUrl: 'templates/tab-activity.html',
          controller: 'ActivityCtrl'
        }
      }
    })
    .state('tab.activity-detail', {
      url: '/activity/:transactionId',
      views: {
        'tab-activity': {
          templateUrl: 'templates/activity-detail.html',
          controller: 'ActivityDetailCtrl'
        }
      }
    })

    .state('auth', {
      url: '/auth',
      templateUrl: 'templates/auth.html',
      controller: 'AuthCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  if(store.get("token")){
    $urlRouterProvider.otherwise('/me');
  } else {
    $urlRouterProvider.otherwise('/auth');
  }
});