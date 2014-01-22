(function(angular){
    'use strict';

    angular.module('vfPersonalSite.common')
        .factory('Path', ['$location', function($location){
            return {
                is: function(route){
                    return ($location.path() === route);
                },
                includes: function(route){
                    return $location.path().indexOf(route) > -1;
                }
            };
        }])

        .factory('Meta', ['$rootScope', function($rootScope){
            return {
                description: function(description){
                    if(description){
                        $rootScope.description = description;
                    }
                    return $rootScope.description;
                },
                title: function(title){
                    if(title){
                        $rootScope.title = title;
                    }
                    return $rootScope.title;
                }
            };
        }])

        .factory('CtrlInit', ['Meta', 'SEO', function(Meta, SEO){
            return function(title, description){
                Meta.title(title);
                Meta.description(description);
                SEO.readyForCapture(true);
            };
        }])

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
