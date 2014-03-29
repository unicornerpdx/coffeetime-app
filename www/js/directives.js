var $red   = '#e66244';
var $green = '#5acf61';
var $cream = '#e6e4e1';
var $dark  = '#333333';

// Chroma Colorizer Directive
angular.module('app.directives', [])

.directive('userColor', function(Me, Group){
  return {
    restrict: 'A',
    link: function(scope, iElement, iAttrs) {
      var amount;
      var min;
      var max;

      var negascale = chroma.scale([$cream, $red], min, 'k-means');
      var scale = chroma.scale([$cream, $green], max, 'k-means');

      function recolor() {
        if(amount > 0) {
          scale.domain([0, max]);
          iElement.css('background-color', scale.mode('lab')(amount));
        } else {
          negascale.domain([0, Math.abs(min)]);
          iElement.css('background-color', negascale.mode('lab')(amount));
        }
      }

      scope.$watch("balance", function(newValue, oldValue){
        amount = newValue;
        recolor();
      });

      scope.$watch("maxDebt", function(newValue, oldValue){
        max = Math.abs(newValue);
        recolor();
      });

      scope.$watch("minDebt", function(newValue, oldValue){
        min = Math.abs(newValue);
        recolor();
      });
    }
  };
})

.directive('transactionBg', function(){
  return {
    restrict: 'A',
    link: function(scope, iElement, iAttrs) {

      function setBackground(number) {
        if (number > 0) {
          iElement.css('background-color', $green);
        } else if (number < 0) {
          iElement.css('background-color', $red);
        } else {
          iElement.css('background-color', $dark);
        }
      }
      scope.$watch('number', function(newValue){
        setBackground(newValue);
      });
    }
  };
})

.directive('transactionColor', function(){
  return {
    restrict: 'A',
    link: function(scope, iElement, iAttrs) {
      function setBackground(number) {
        if (number > 0) {
          iElement.css('color', $green);
        } else if (number < 0) {
          iElement.css('color', $red);
        } else {
          iElement.css('color', $dark);
        }
      }
      scope.$watch('number', function(newValue){
        setBackground(newValue);
      });
    }
  };
});