(function(angular){
    'use strict';

    angular.module('vfSilly', [])
        .directive('randomGlyphicon', ['$rootScope', function($rootScope){
            var glyphiconSuffixList = ['camera','certificate','cloud','cog','compressed','cutlery','earphone','eye-close',
                'eye-open','facetime-video','fire','flash','flag','font','gift','globe','hand-down','hd-video',
                'headphones','heart','heart-empty','leaf','magnet','music','off','paperclip','phone-alt','picture','plane','road',
                'send','shopping-cart','stats','star','star-empty','thumbs-up','time','tint','tower','tree-conifer','tree-deciduous','usd',
                'user','wrench'];
            return {
                restrict: 'E',
                replace: true,
                template: '<span class="glyphicon glyphicon-{{suffix}} random-glyphicon" ng-click="randomize()"></span>',
                scope: {},
                link: function(scope, element){
                    scope.randomize = function(){
                        var color = Math.floor((Math.random()*4096)).toString(16);
                        if(color.length < 3) {
                            color = new Array(4 - color.length).join('0') + color;
                        }
                        element.css('color', '#' + color);
                        scope.suffix = glyphiconSuffixList[Math.floor((Math.random()*glyphiconSuffixList.length))];
                    };
                    $rootScope.$on('$routeChangeSuccess', scope.randomize);
                }
            };
        }])
        .directive('jaj', ['$rootScope', function($rootScope){
            var colors = ['red', 'green', 'blue'],
                unsubscribe;
            return {
                restrict: 'A',
                template: '<span style="color:{{color0}};">J</span><span ng-if="full">ust </span><span style="color:{{color1}};">A</span><span ng-if="full">nother </span><span style="color:{{color2}};">J</span><span ng-if="full">AJ</span>',
                scope: {
                    full: '@jaj'
                },
                link: function(scope, element){
                    scope.randomize = function(){
                        var tmpColors = colors.slice(0), i = tmpColors.length;
                        while(i--){
                            scope['color'+i] = tmpColors.splice(Math.floor((Math.random()*tmpColors.length)),1)[0];
                        }
                    };
                    unsubscribe = $rootScope.$on('$routeChangeSuccess', scope.randomize);
                    scope.$on('$destroy', function(){
                        unsubscribe();
                    });
                    scope.randomize();
                }
            };
        }]);
}(window.angular));