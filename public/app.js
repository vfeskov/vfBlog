(function(angular, hljs){
    'use strict';
    var app;
    app = angular.module('vf.ng-personal-site', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'ngRoute', 'ngSanitize', 'ngDisqus']);
    app.config(['$disqusProvider', '$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider', function config ($disqusProvider, $stateProvider, $httpProvider, $locationProvider, $urlRouterProvider){
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home',{
            url: '/',
            templateUrl: '/views/home.html',
            controller: 'HomeCtrl'
        });
        $stateProvider.state('posts',{
            url: '/posts',
            templateUrl: '/views/posts.html',
            controller: 'PostsCtrl'
        });
        $stateProvider.state('posts.post',{
            url: '/:slug',
            templateUrl: '/views/posts/post.html',
            controller: 'PostsPostCtrl'
        });
        $stateProvider.state('about',{
            url: '/about',
            templateUrl: '/views/about.html',
            controller: 'AboutCtrl'
        });
        $disqusProvider.setShortname('vladimirfeskov');
    }]);
    app.run(function run($rootScope, $state, $location) {
        $rootScope.$state = $state;
        $rootScope.title = 'Vladimir Feskov';
        $rootScope.description = 'Personal site';
        $rootScope.$on('$stateChangeSuccess', function(){
           console.log($location.path());
        });
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-39039659-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    });
    app.factory('Posts', ['$http', '$q', function($http, $q){
        function getAll (){
            return $http.get('/json/posts.json').then(function(data){
                return data.data;
            });
        }
        function getBy (key, val){
            var deferred = $q.defer(),
                promise = deferred.promise;
            getAll().then(function(data){
                var i = data.length;
                while(i--){
                    if(data[i][key] === val){
                        deferred.resolve(data[i]);
                        break;
                    }
                }
            });
            return promise;
        }
        function getById (id){
            return getBy('id', id);
        }
        function getBySlug (slug){
            return getBy('slug', slug);
        }
        return {
            getAll: getAll,
            getById: getById,
            getBySlug: getBySlug
        };
    }]);
    app.factory('Meta', ['$rootScope', function($rootScope){
        return {
            description: function(description){
                if(description){
                    $rootScope.description = description;
                }
                return $rootScope.description;
            },
            title: function(title){
                if(title){
                    $rootScope.title = title;
                }
                return $rootScope.title;
            }
        };
    }]);
    app.controller('HomeCtrl', ['Meta', function(Meta){
        Meta.description('Personal site of a guy from Ukraine who happens to work as web developer.');
        Meta.title('Vladimir Feskov');
    }]);
    app.controller('PostsCtrl', ['Posts', 'Meta', '$scope', function(Posts, Meta, $scope){
        $scope.$on('$stateChangeSuccess', function(event, toState){
            if(toState.name === 'posts'){
                Meta.title('Posts - Vladimir Feskov');
                Meta.description('Posts about web development.');
            }
        });
        Posts.getAll().then(function(posts){
            $scope.posts = posts;
        });
    }]);
    app.controller('PostsPostCtrl', ['Posts', 'Meta', '$stateParams', '$scope', function(Posts, Meta, $stateParams, $scope){
        Meta.title('Posts - Vladimir Feskov');
        Meta.description('Posts about web development.');
        Posts.getBySlug($stateParams.slug).then(function(post){
            $scope.post = post;
            Meta.title(post.title + ' - Posts - Vladimir Feskov');
            Meta.description(post.description);
        });
    }]);
    app.controller('AboutCtrl', ['Meta', function(Meta){
        Meta.title('About - Vladimir Feskov');
        Meta.description('Some info about myself and my work.');
    }]);
    app.directive('postContent', [function(){
        return {
            restrict: 'E',
            template: '<div ng-bind-html="content"></div>',
            replace: true,
            scope: {
                content: '='
            },
            link: function(scope, element, attrs){
                scope.$watch('content', function(){
                    //remove extra spaces caused by parent tags' indentation
                    element.find('pre code').each( function () {
                        var lines, offset;
                        lines = angular.element( this ).text().split( '\n' );
                        if ( lines.length > 1 && lines[ 0 ].trim() === '' ) {
                            lines.shift();
                        }
                        offset = lines[ 0 ].match( /^\s*/ )[ 0 ].length;
                        lines = lines.map( function ( line ) {
                            return line.slice( offset );
                        });
                        angular.element( this ).text( lines.join( '\n' ) );
                        hljs.highlightBlock(this);
                    });

                });
            }
        };
    }]);
}(window.angular, window.hljs));