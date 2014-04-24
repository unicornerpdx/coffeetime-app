  var openedWithURL;

// @TODO wrap this up in a service
window.StatusBar = window.StatusBar || {
  styleLightContent: function(){
    console.log("LightStatusBar");
  },
  styleDefault: function() {
    console.log("styleDefault");
  }
};

// @TODO wrap this up in a service
function handleOpenURL(url){
  // coffeetime://transaction?group_id=123&transaction_id=123
  var code = url.match(/code=(.+)/)[1];
  angular.element(document.body).injector().invoke(function(Session){
    Session.finishAuth(code);
  });
}

// @TODO wrap this up in a service
function onNotificationGCM(e){
  console.log(e);
  switch( e.event ){
  case 'registered':
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

// @TODO wrap this up in a service
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

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'app.filters', 'app.directives', 'angularMoment'])

.value("Config", {
  server: "https://api.coffeetime.io/1/"
})

.run(function(Session, Cache, $ionicPlatform){
  $ionicPlatform.ready(function() {
    navigator.splashscreen.hide();

    window.StatusBar.styleLightContent();

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
  $stateProvider

    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

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

    .state('tab.activity', {
      url: '/activity',
      views: {
        'tab-activity': {
          templateUrl: 'templates/tab-activity.html',
          controller: 'ActivityCtrl'
        }
      }
    })

    .state('activity-detail', {
      url: '/activity/:transactionId',
      templateUrl: 'templates/activity-detail.html',
      controller: 'ActivityDetailCtrl'
    })

    .state('coffee-transaction', {
      url: '/exchange/:userId',
      templateUrl: 'templates/coffee-transaction.html',
      controller: 'TransactionCtrl'
    })

    .state('auth', {
      url: '/auth',
      templateUrl: 'templates/auth.html',
      controller: 'AuthCtrl'
    })

    .state('teams', {
      url: '/teams',
      templateUrl: 'templates/teams.html',
      controller: 'TeamCtrl'
    });
})

.run(function($state, Cache){
  if(Cache.token()){
    $state.go('tab.me');
  } else {
    $state.go('auth');
  }
});