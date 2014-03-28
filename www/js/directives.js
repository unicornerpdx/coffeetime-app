// Chroma Colorizer Directive
angular.module('app.directives', [])

.directive('userColor', function(Me, Group){
  console.log(Me.fetch(), Group);
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs) {
      var $red = '#e66244';
      var $green = '#5acf61';
      var $cream = '#e6e4e1';
      var scale = chroma.scale([$cream, $green]);
      var negascale = chroma.scale([$red, $cream]);
      var amount;
      var min;
      var max;

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
});


