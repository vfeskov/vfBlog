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
        };
    });

