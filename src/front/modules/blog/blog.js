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

    .run(['$rootScope', 'Path', 'vfGA', 'SEO', '$templateCache', function run($rootScope, Path, vfGA, SEO, $templateCache) {
        $rootScope.path = Path;
        $rootScope.$on('$routeChangeStart', function(){
            SEO.readyForCapture(false);
        });
        vfGA('UA-39039659-1');
        $rootScope.$on('$routeChangeSuccess', function(){
            console.log(arguments);
            console.log(arguments[1].loadedTemplateUrl);
            console.log($templateCache.get(arguments[1].loadedTemplateUrl));
        });
    }]);
