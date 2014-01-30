/*
 * vfBlog v.0.1.0
 * (c) 2014 Vladimir Feskov http://vfeskov.com
 * License: MIT
 */
(function (angular) {
    'use strict';

    angular.module('vfAnchor')
        .provider('vfAnchor', function(){
            var stickyHeaderHeight = 0;
            return {
                setStickyHeaderHeight: function(height){
                    stickyHeaderHeight = height;
                },
                $get: function(){
                    return {
                        getStickyHeaderHeight: function(){
                            return stickyHeaderHeight;
                        }
                    };
                }
            }
        });

}(window.angular));