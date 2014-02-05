'use strict';
// Correctly reloads twitter timeline widget.
// If raw twitter snippet is used, twitter timeline breaks after few quick route changes
angular.module('vfTwitter')
    .factory('vfTwitter', ['$window', function($window){
        $window.twttr = (function (d,s,id) {
            var t, js, fjs = d.getElementsByTagName(s)[0];
            if (!d.getElementById(id)) {
                js=d.createElement(s); js.id=id;
                js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
            }
            return $window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f); } });
        }($window.document, "script", "twitter-wjs"));
        return $window.twttr;
    }]);
