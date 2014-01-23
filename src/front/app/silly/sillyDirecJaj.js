(function(angular){
    'use strict';

    angular.module('vfSilly')
        .directive('jaj', ['$rootScope', function($rootScope){
            var colors = ['red', 'green', 'blue'],
                unsubscribe;
            return {
                restrict: 'A',
                template: '<span style="color:{{color0}};">J</span><span ng-if="full">ust </span><span style="color:{{color1}};">A</span><span ng-if="full">nother </span><span style="color:{{color2}};">J</span><span ng-if="full">AJ</span>',
                scope: {
                    full: '@jaj'
                },
                link: function(scope, element, attrs){
                    if(angular.isDefined(attrs.random)){
                        var tmpColors = colors.slice(0), i = tmpColors.length;
                        while(i--){
                            scope['color'+i] = tmpColors.splice(Math.floor((Math.random()*tmpColors.length)),1)[0];
                        }
                    } else {
                        scope.color0 = 'red';
                        scope.color1 = 'green';
                        scope.color2 = 'blue';
                    }

                }
            };
        }]);
}(window.angular));