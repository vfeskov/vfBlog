/*
 * vfBlog v.0.1.0
 * (c) 2014 Vladimir Feskov http://vfeskov.com
 * License: MIT
 */
(function(angular){
    'use strict';

    // Correctly reloads twitter timeline widget.
    // If raw twitter snippet is used, twitter timeline breaks after few quick route changes
    angular.module('vfTwitter')
        .directive('twitterTimeline', ['vfTwitter', function(vfTwitter){
            return {
                restrict: 'C',
                link: function(){
                    if(!vfTwitter.init){
                        vfTwitter.ready(function(){
                            vfTwitter.widgets.load();
                        });
                    } else {
                        vfTwitter.widgets.load();
                    }
                }
            }
        }]);
}(window.angular));