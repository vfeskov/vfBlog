/*
 * vfBlog v.0.1.0
 * (c) 2014 Vladimir Feskov http://vfeskov.com
 * License: MIT
 */
(function(angular){
    'use strict';

    angular.module('vfBlog')
        .factory('CtrlInit', ['Meta', 'SEO', function(Meta, SEO){
            return function(title, description){
                Meta.title(title);
                Meta.description(description);
                SEO.readyForCapture(true);
            };
        }]);
}(window.angular));
