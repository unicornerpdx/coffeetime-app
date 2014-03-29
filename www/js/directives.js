var $red   = '#e66244';
var $green = '#5acf61';
var $cream = '#e6e4e1';
var $dark  = '#333333';

// Chroma Colorizer Directive
angular.module('app.directives', [])

.directive('userColor', function(Me, Group){
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs) {
      var amount;
      var min;
      var max;
      var scale = chroma.scale([$cream, $green], max, 'k-means');
      var negascale = chroma.scale([$red, $cream], min, 'k-means');

      function recolor() {
        if(amount > 0) {
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

.directive('transactionBg', function(){
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs) {
      function setBackground() {
        if (number > 0) {
          iElement.css('background-color', $green);
        } else if (number < 0) {
          iElement.css('background-color', $red);
        } else {
          iElement.css('background-color', $dark);
        }
      }
      scope.$watch('number', function(newValue, oldValue){
        number = newValue;
        setBackground();
      });
    }
  };
})

.directive('transactionColor', function(){
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs) {
      function setBackground() {
        if (number > 0) {
          iElement.css('color', $green);
        } else if (number < 0) {
          iElement.css('color', $red);
        } else {
          iElement.css('color', $dark);
        }
      }
      scope.$watch('number', function(newValue, oldValue){
        number = newValue;
        setBackground();
      });
    }
  };
});


