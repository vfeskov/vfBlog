(function(angular){
    'use strict';

    angular.module('vfPersonalSite.pages')
        .config(['$routeProvider', function config ($routeProvider){
            $routeProvider.when('/',{
                templateUrl: 'home.html',
                controller: 'HomeCtrl'
            });

            $routeProvider.when('/about',{
                templateUrl: 'about.html',
                controller: 'AboutCtrl'
            });
    }]);
}(window.angular));