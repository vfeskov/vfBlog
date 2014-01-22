(function(angular){
    'use strict';

    angular.module('vfPersonalSite.posts')
        .controller('PostsCtrl', ['CtrlInit', 'posts', '$scope', function(CtrlInit, posts, $scope){
            $scope.posts = posts;
            CtrlInit('Posts - JAJ', 'Posts about web development');
        }])

        .controller('PostCtrl', ['CtrlInit', 'post', '$scope', '$sce', function(CtrlInit, post, $scope, $sce){
            $scope.post = post;
            $scope.post.content = $sce.trustAsHtml($scope.post.content);
            CtrlInit(post.title + ' - Posts - JAJ', post.description);
        }]);
}(window.angular));