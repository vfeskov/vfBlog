(function(angular){
    'use strict';

    angular.module('vfBlog')
        .factory('Path', ['$location', function($location){
            return {
                is: function(route){
                    return ($location.path() === route);
                },
                includes: function(route){
                    return $location.path().indexOf(route) > -1;
                }
            };
        }]);
}(window.angular));
