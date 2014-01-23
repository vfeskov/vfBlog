(function(angular){
    'use strict';

    angular.module('vfBlog.pages.home')
        .config(['$routeProvider', function config ($routeProvider){
            $routeProvider.when('/',{
                templateUrl: 'blog/pages/home/homeTempl.html',
                controller: 'HomeCtrl'
            });
        }])
        .controller('HomeCtrl', ['CtrlInit', function(CtrlInit){
            CtrlInit('JAJ', 'JAJ is a blog about web development, software engineering and stuff')
        }]);
}(window.angular));