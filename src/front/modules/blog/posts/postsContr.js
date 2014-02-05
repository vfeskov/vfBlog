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
    .controller('PostsCtrl', ['ctrlInit', 'posts', '$scope', function(ctrlInit, posts, $scope){
        $scope.posts = posts;
        ctrlInit('Posts - JAJ', 'Posts about web development');
    }]);
