/*
 * vfBlog v.0.1.0
 * (c) 2014 Vladimir Feskov http://vfeskov.com
 * License: MIT
 */
(function(angular){
    'use strict';

    angular.module('vfBlog.posts')
        .config(['$routeProvider', function config ($routeProvider){
            $routeProvider.when('/posts',{
                templateUrl: 'blog/posts/postsTempl.html',
                controller: 'PostsCtrl',
                resolve: {
                    posts: ['Posts', function(Posts){
                        return Posts.getAll();
                    }]
                }
            });
        }])
        .controller('PostsCtrl', ['CtrlInit', 'posts', '$scope', function(CtrlInit, posts, $scope){
            $scope.posts = posts;
            CtrlInit('Posts - JAJ', 'Posts about web development');
        }]);
}(window.angular));