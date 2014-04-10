var $red        = '#CB4400';
var $lightred   = '#ED7264';
var $green      = '#55A33B';
var $lightgreen = '#98CC82';
var $cream      = '#e6e4e1';
var $dark       = '#333333';

// Chroma Colorizer Directive
angular.module('app.directives', [])

.directive('transactionButton', function($interval){
  return {
    restrict: 'A',
    link: function(scope, iElement, iAttrs){
      var timer;

      iElement.on("touchstart", function(){
        timer = $interval(function(){
          scope.$eval(iAttrs.transactionButton);
        }, 200);
      });

      iElement.on("touchend", function(){
        $interval.cancel(timer);
        scope.$eval(iAttrs.transactionButton);
      });
    }
  };
})

.directive('colorDebtBadge', function(Cache){
  return {
    restrict: "A",
    link: function(scope, iElement, iAttrs){
      if (Cache.me().user_id === scope.transaction.from_user_id) {
        iElement.css("background-color", $green);
      } else {
        iElement.css("background-color", $red);
      }
    }
  };
})

.directive('userDebtBadge', function(Cache){
  return {
    restrict: "A",
    link: function(scope, iElement, iAttrs){
      function recolor(amount){
        if (amount > 0) {
          iElement.css("background-color", $green);
        } else if (amount < 0) {
          iElement.css("background-color", $red);
        } else {
          iElement.css("background-color", $dark);
        }
      }

      scope.$watch(iAttrs.userDebtBadge, function(newValue){
        recolor(newValue);
      });
    }
  };
})

.directive('userColor', function(){
  return {
    restrict: 'A',
    link: function(scope, iElement, iAttrs) {
      var balance;
      var min;
      var max;
      var scale = chroma.scale([$lightgreen, $green], max, 'k-means');
      var negascale = chroma.scale([$red, $lightred], min, 'k-means');

      function recolor() {
        if (balance === 0) {
          iElement.css('background-color', $dark);
        } else if(balance > 0) {
          scale.domain([0, max]);
          iElement.css('background-color', scale.mode('lab')(balance));
        } else {
          negascale.domain([0, Math.abs(min)]);
          iElement.css('background-color', negascale.mode('lab')(balance));
        }
      }

      scope.$watch(iAttrs.balance, function(newValue, oldValue){
        balance = newValue;
        recolor();
      });

      scope.$watch(iAttrs.maxBalance, function(newValue, oldValue){
        max = Math.abs(newValue);
        recolor();
      });

      scope.$watch(iAttrs.minBalance, function(newValue, oldValue){
        min = Math.abs(newValue);
        recolor();
      });
    }
  };
})

.directive('bodyColor', function(){
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs) {
      function setColorClass(balance) {
        if (balance > 0) {
          iElement.addClass('green').removeClass('red neutral');
        } else if (balance < 0) {
          iElement.addClass('red').removeClass('green neutral');
        } else {
          iElement.addClass('neutral').removeClass('red green');
        }
      }
      scope.$watch(iAttrs.bodyColor, function(newValue, oldValue){
        setColorClass(newValue);
      });
    }
  };
})

.directive('colorizeOn', function(){
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs) {
      var cssProperty = iAttrs.colorizeProperty || "background";

      function setBackground(value) {
        if (value > 0) {
          iElement.css(cssProperty, $green);
        } else if (value < 0) {
          iElement.css(cssProperty, $red);
        } else {
          iElement.css(cssProperty, $dark);
        }
      }

      scope.$watch(iAttrs.colorizeOn, function(newValue, oldValue){
        setBackground(newValue);
      });
    }
  };
})

.directive('staticMap', function(){
  return {
    restrict: 'E',
    replace: false,
    scope: {
      latitude: '@',
      longitude: '@',
      balance:    '@',
      isdebt: '@',
      zoom: '@',
      width: '@',
      height: '@'
    },
    templateUrl: 'templates/static-map.html'
  };
});
