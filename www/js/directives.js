var $red        = '#CB4400';
var $lightred   = '#ED7264';
var $green      = '#55A33B';
var $lightgreen = '#98CC82';
var $cream      = '#e6e4e1';
var $dark       = '#333333';

// Chroma Colorizer Directive
angular.module('app.directives', [])

.directive('userColor', function(Me, Group){
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs) {
      var amount;
      var min;
      var max;
      var scale = chroma.scale([$lightgreen, $green], max, 'k-means');
      var negascale = chroma.scale([$red, $lightred], min, 'k-means');

      function recolor() {
        if (amount === 0) {
          iElement.css('background-color', $dark);
        } else if(amount > 0) {
          scale.domain([0, max]);
          iElement.css('background-color', scale.mode('lab')(amount));
        } else {
          negascale.domain([min, 0]);
          iElement.css('background-color', negascale.mode('lab')(amount));
        }
      }

      scope.$watch("user.amount", function(newValue, oldValue){
        amount = newValue;
        recolor();
      });

      scope.$watch(Group.getMaxDebt, function(newValue, oldValue){
        max = newValue;
        recolor();
      });

      scope.$watch(Group.getMinDebt, function(newValue, oldValue){
        min = newValue;
        recolor();
      });
    }
  };
})

.directive('bodyColor', function(){
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs) {
      function setColorClass() {
        if (amount > 0) {
          iElement.addClass('green').removeClass('red neutral');
        } else if (amount < 0) {
          iElement.addClass('red').removeClass('green neutral');
        } else {
          iElement.addClass('neutral').removeClass('red green');
        }
      }
      scope.$watch('me.amount', function(newValue, oldValue){
        amount = newValue;
        setColorClass();
      });
    }
  };
})

.directive('colorizeOn', function(){
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs) {
      var cssProperty = iAttrs.colorizeProperty || "background";
      function setBackground() {
        if (value > 0) {
          iElement.css(cssProperty, $green);
        } else if (value < 0) {
          iElement.css(cssProperty, $red);
        } else {
          iElement.css(cssProperty, $dark);
        }
      }
      scope.$watch(iAttrs.colorizeOn, function(newValue, oldValue){
        value = newValue;
        setBackground();
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
      amount:    '@',
      isdebt: '@'
    },
    templateUrl: 'templates/static-map.html'
  };
});


