(function(angular){
    'use strict';

    angular.module('vfBlog.pages.about')
        .config(['$routeProvider', function config ($routeProvider){
            $routeProvider.when('/about',{
                templateUrl: 'blog/pages/about/aboutTempl.html',
                controller: 'AboutCtrl'
            });
        }])
        .controller('AboutCtrl', ['CtrlInit', function(CtrlInit){
            CtrlInit('About - JAJ', 'JAJ is Just Another JAJ');
        }]);
}(window.angular));