(function(angular){
    'use strict';

    angular.module('vfPersonalSite.posts')
        .config(['$routeProvider', function config ($routeProvider){

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

    }]);
}(window.angular));