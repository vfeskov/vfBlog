/*
 * vfBlog v.0.1.0
 * (c) 2014 Vladimir Feskov http://vfeskov.com
 * License: MIT
 */
(function(angular){
    'use strict';

    angular.module('vfBlog')
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
        }]);
}(window.angular));
