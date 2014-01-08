(function(angular, window){
    'use strict';
    var app;
    app = angular.module('vf.blog', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'ngRoute', 'ngSanitize']);
    app.config(['$stateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider', function config ($stateProvider, $httpProvider, $locationProvider, $urlRouterProvider){
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home',{
            url: '/',
            templateUrl: '/views/home.html'
        });
        $stateProvider.state('posts',{
            url: '/posts',
            templateUrl: '/views/posts.html',
            controller: 'PostsCtrl'
        });
        $stateProvider.state('posts.list',{
            url: '/',
            templateUrl: '/views/posts/list.html',
            controller: 'PostsListCtrl'
        });
        $stateProvider.state('posts.post',{
            url: '/:slug',
            templateUrl: '/views/posts/post.html',
            controller: 'PostsPostCtrl'
        });
    }]);
    app.run(function run($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
    app.factory('Posts', ['$http', '$q', function($http, $q){
        function getAll (){
            return $http.get('/json/posts.json').then(function(data){
                console.log(data.data);
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
    app.controller('PostsCtrl', ['$state', function($state){
        $state.go('posts.list');
    }]);
    app.controller('PostsListCtrl', ['Posts', '$scope', function(Posts, $scope){
        Posts.getAll().then(function(posts){
            $scope.posts = posts;
        });
    }]);
    app.controller('PostsPostCtrl', ['Posts', '$stateParams', '$scope', function(Posts, $stateParams, $scope){
        Posts.getBySlug($stateParams.slug).then(function(post){
            $scope.post = post;
        });
    }]);
}(window.angular, window));