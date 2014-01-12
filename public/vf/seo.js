(function(angular){
    'use strict';

    //SEO factory is used to tell when it is safe to capture a snapshot of a page for crawler
    angular.module('vfSEO', []).
        factory('SEO', ['$timeout', '$rootScope', function($timeout, $rootScope){
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