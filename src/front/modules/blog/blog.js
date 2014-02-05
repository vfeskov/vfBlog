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
