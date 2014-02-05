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

