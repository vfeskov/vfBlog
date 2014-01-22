(function(angular){
    'use strict';

    angular.module('vfPersonalSite', [
            'ngAnimate',
            'ngRoute',
            'ngDisqus',
            'vf',

            'vfPersonalSite.templates',
            'vfPersonalSite.common',
            'vfPersonalSite.pages',
            'vfPersonalSite.posts'
        ], ['$disqusProvider', '$routeProvider', '$httpProvider', '$locationProvider', function config ($disqusProvider, $routeProvider, $httpProvider, $locationProvider){
            $locationProvider.html5Mode(true).hashPrefix('!');
            $routeProvider.otherwise('/');
            $disqusProvider.setShortname('vladimirfeskov');
        }])

        .run(['$rootScope', 'Path', 'GA', 'SEO', function run($rootScope, Path, GA, SEO) {
            $rootScope.path = Path;
            $rootScope.$on('$routeChangeStart', function(){
                SEO.readyForCapture(false);
            });
            GA('UA-39039659-1');
        }]);

}(window.angular));