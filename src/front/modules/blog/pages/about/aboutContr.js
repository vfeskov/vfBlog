'use strict';
angular.module('vfBlog.pages.about')
    .config(['$routeProvider', function config ($routeProvider){
        $routeProvider.when('/about',{
            templateUrl: 'blog/pages/about/aboutTempl.html',
            controller: 'AboutCtrl'
        });
    }])
    .controller('AboutCtrl', ['ctrlInit', function(ctrlInit){
        ctrlInit('About - JAJ', 'JAJ is Just Another JAJ');
    }]);
