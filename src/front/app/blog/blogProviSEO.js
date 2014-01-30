/*
 * vfBlog v.0.1.0
 * (c) 2014 Vladimir Feskov http://vfeskov.com
 * License: MIT
 */
(function(angular){
    'use strict';

    angular.module('vfBlog')
        .factory('SEO', ['$timeout', '$rootScope', function($timeout, $rootScope){
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
}(window.angular));
