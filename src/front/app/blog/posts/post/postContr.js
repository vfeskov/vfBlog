(function(angular){
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
        .controller('PostCtrl', ['CtrlInit', 'post', '$scope', '$sce', function(CtrlInit, post, $scope, $sce){
            $scope.post = post;
            $scope.post.content = $sce.trustAsHtml($scope.post.content);
            CtrlInit(post.title + ' - Posts - JAJ', post.description);
        }]);
}(window.angular));