(function(angular){
    'use strict';

    angular.module('vfPersonalSite', [
            'ngAnimate',
            'ngRoute',

            //'ui.bootstrap',
            'ngDisqus',

            'vfPersonalSite.templates',

            'vfGoogleAnalytics',
            'vfSEO',
            'vfTwitter',
            'vfCodeHighlighting',
            'vfSilly'
        ], ['$disqusProvider', '$routeProvider', '$httpProvider', '$locationProvider', function config ($disqusProvider, $routeProvider, $httpProvider, $locationProvider){
            $locationProvider.html5Mode(true).hashPrefix('!');

            $routeProvider.when('/',{
                templateUrl: 'home.html',
                controller: 'HomeCtrl'
            });
            $routeProvider.when('/posts',{
                templateUrl: 'posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    posts: ['Posts', function(Posts){
                        return Posts.getAll();
                    }]
                }
            });
            $routeProvider.when('/posts/:slug',{
                templateUrl: 'posts/post.html',
                controller: 'PostCtrl',
                resolve: {
                    post: ['Posts', '$route', function(Posts, $route){
                        return Posts.getBySlug($route.current.params.slug);
                    }]
                }
            });
            $routeProvider.when('/about',{
                templateUrl: 'about.html',
                controller: 'AboutCtrl'
            });

            $routeProvider.otherwise('/');
            $disqusProvider.setShortname('vladimirfeskov');
        }])

        .run(['$rootScope', 'Path', 'GA', 'SEO', function run($rootScope, Path, GA, SEO) {
            $rootScope.path = Path;
            $rootScope.title = 'Vladimir Feskov';
            $rootScope.description = 'Personal site';
            $rootScope.$on('$routeChangeStart', function(){
                SEO.readyForCapture(false);
            });
            GA('UA-39039659-1');
        }])

        .controller('HomeCtrl', ['CtrlInit', function(CtrlInit){
            CtrlInit('Vladimir Feskov', 'Personal site of a guy from Ukraine who happens to work as web developer.')
        }])

        .controller('PostsCtrl', ['CtrlInit', 'posts', '$scope', function(CtrlInit, posts, $scope){
            $scope.posts = posts;
            CtrlInit('Posts - Vladimir Feskov', 'Posts about web development.');
        }])

        .controller('PostCtrl', ['CtrlInit', 'post', '$scope', '$sce', function(CtrlInit, post, $scope, $sce){
            $scope.post = post;
            $scope.post.content = $sce.trustAsHtml($scope.post.content);
            CtrlInit(post.title + ' - Posts - Vladimir Feskov', post.description);
        }])

        .controller('AboutCtrl', ['CtrlInit', function(CtrlInit){
            CtrlInit('About - Vladimir Feskov', 'Some info about myself and my work.');
        }])

        .factory('Path', ['$location', function($location){
            return {
                is: function(route){
                    return ($location.path() === route);
                },
                includes: function(route){
                    return $location.path().indexOf(route) > -1;
                }
            };
        }])

        .factory('Posts', ['$http', '$q', function($http, $q){
            function getAll (){
                return $http.get('/posts.json').then(function(data){
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
        }])

        .factory('Meta', ['$rootScope', function($rootScope){
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
        }])

        .factory('CtrlInit', ['Meta', 'SEO', function(Meta, SEO){
            return function(title, description){
                Meta.title(title);
                Meta.description(description);
                SEO.readyForCapture(true);
            };
        }])

        .directive('autoPositionFooter',['$window', '$timeout', function($window, $timeout){
            return {
                restrict: 'A',
                link: function(scope, element){
                    function positionFooter(){
                        var windowHeight = angular.element($window).height(),
                            bodyHeight = angular.element('body').height(),
                            alreadyStaticFooter = element.hasClass('static-footer');
                        if(bodyHeight > windowHeight && !alreadyStaticFooter){
                            element.addClass('static-footer');
                        } else if(bodyHeight <= windowHeight && alreadyStaticFooter){
                            element.removeClass('static-footer');
                        }
                    }
                    angular.element($window).resize(positionFooter);
                    scope.$on('$includeContentLoaded', function(){
                        $timeout(positionFooter);
                    });
                    scope.$on('$viewContentLoaded', function(){
                        $timeout(positionFooter);
                    });
                    scope.$on('$locationChangeStart', function(){
                        element.removeClass('static-footer');
                    });
                }
            };
        }]);




}(window.angular));