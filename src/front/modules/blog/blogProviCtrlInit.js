'use strict';
angular.module('vfBlog')
    .factory('ctrlInit', ['Meta', 'SEO', function(Meta, SEO){
        return function(title, description){
            Meta.title(title);
            Meta.description(description);
            SEO.readyForCapture(true);
        };
    }]);

