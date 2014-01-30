/*
 * vfBlog v.0.1.0
 * (c) 2014 Vladimir Feskov http://vfeskov.com
 * License: MIT
 */
(function(angular){
    'use strict';

    angular.module('vfBlog', [
        'ngRoute',
        'ngDisqus',
        'vfAnchor',
        'vfGA',
        'vfSilly',
        'vfTwitter',
        'vfBlog.pages',
        'vfBlog.posts'
    ], ['$disqusProvider', '$routeProvider', '$httpProvider', '$locationProvider', function config ($disqusProvider, $routeProvider, $httpProvider, $locationProvider){
            $locationProvider.html5Mode(true).hashPrefix('!');
            $routeProvider.otherwise('/');
            $disqusProvider.setShortname('vladimirfeskov');
        }])

        .run(['$rootScope', 'Path', 'vfGA', 'SEO', function run($rootScope, Path, vfGA, SEO) {
            $rootScope.path = Path;
            $rootScope.$on('$routeChangeStart', function(){
                SEO.readyForCapture(false);
            });
            vfGA('UA-39039659-1');
        }]);
}(window.angular));