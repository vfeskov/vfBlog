(function(angular, hljs){
    'use strict';
    var app;

    angular.module('vfGoogleAnalytics', []).
        factory('GA', ['$window', '$rootScope', '$timeout', function($window, $rootScope, $timeout){
            return function(accountId){
                $window._gaq = $window._gaq || [];
                $window._gaq.push(['_setAccount', accountId]);
                $rootScope.$on('$stateChangeSuccess', function(){
                    $timeout(function(){
                        $window._gaq.push(['_trackPageview']);
                    });
                });
            }
        }]);

    angular.module('vfSEO', []).
        factory('SEO', ['$timeout', '$rootScope', function($timeout, $rootScope){
            return {
                readyForCapture: function(isReady){
                    $timeout(function(){
                        if(isReady) {
                            $rootScope.status = 'ready';
                        } else {
                            $rootScope.status = 'loading';
                        }
                    });
                }
            };
        }]);

    app = angular.module('vfPersonalSite', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'ngRoute', 'ngSanitize', 'ngDisqus', 'vfGoogleAnalytics', 'vfSEO']);
    app.config(['$disqusProvider', '$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider', function config ($disqusProvider, $stateProvider, $httpProvider, $locationProvider, $urlRouterProvider){
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home',{
            url: '/',
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
    app.run(['$rootScope', '$state', 'GA', 'SEO', function run($rootScope, $state, GA, SEO) {
        $rootScope.$state = $state;
        $rootScope.title = 'Vladimir Feskov';
        $rootScope.description = 'Personal site';
        GA('UA-39039659-1');
        $rootScope.$on('$stateChangeStart', function(){
            SEO.readyForCapture(false);
        })
    }]);
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
    app.controller('HomeCtrl', ['Meta', 'SEO', function(Meta, SEO){
        Meta.description('Personal site of a guy from Ukraine who happens to work as web developer.');
        Meta.title('Vladimir Feskov');
        SEO.readyForCapture(true);
    }]);
    app.controller('PostsCtrl', ['Posts', 'Meta', '$scope', 'SEO', function(Posts, Meta, $scope, SEO){
        $scope.$on('$stateChangeSuccess', function(event, toState){
            if(toState.name === 'posts'){
                Meta.title('Posts - Vladimir Feskov');
                Meta.description('Posts about web development.');
                SEO.readyForCapture(true);
            }
        });
        Posts.getAll().then(function(posts){
            $scope.posts = posts;
            SEO.readyForCapture(true);
        });
    }]);
    app.controller('PostsPostCtrl', ['Posts', 'Meta', '$stateParams', '$scope', 'SEO', function(Posts, Meta, $stateParams, $scope, SEO){
        Meta.title('Posts - Vladimir Feskov');
        Meta.description('Posts about web development.');
        Posts.getBySlug($stateParams.slug).then(function(post){
            $scope.post = post;
            Meta.title(post.title + ' - Posts - Vladimir Feskov');
            Meta.description(post.description);
            SEO.readyForCapture(true);
        });
    }]);
    app.controller('AboutCtrl', ['Meta', 'SEO', function(Meta, SEO){
        Meta.title('About - Vladimir Feskov');
        Meta.description('Some info about myself and my work.');
        SEO.readyForCapture(true);
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