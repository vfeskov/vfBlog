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
        }]);
}(window.angular));