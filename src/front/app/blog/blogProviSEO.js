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
