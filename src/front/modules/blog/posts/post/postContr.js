'use strict';
angular.module('vfBlog.posts.post')
    .config(['$routeProvider', function config ($routeProvider){
        $routeProvider.when('/posts/:slug',{
            templateUrl: 'blog/posts/post/postTempl.html',
            controller: 'PostCtrl',
            resolve: {
                post: ['Posts', '$route', function(Posts, $route){
                    return Posts.getBySlug($route.current.params.slug);
                }]
            }
        });
    }])
    .controller('PostCtrl', ['ctrlInit', 'post', '$scope', '$sce', function(ctrlInit, post, $scope, $sce){
        $scope.post = post;
        $scope.post.content = $sce.trustAsHtml($scope.post.content);
        ctrlInit(post.title + ' - Posts - JAJ', post.description);
    }]);
