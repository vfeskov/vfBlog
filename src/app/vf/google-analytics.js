(function(angular){
    'use strict';

    //works with ngRoute, to make it work with ui.router '$routeChangeSuccess' should be changed to $stateChangeSuccess
    angular.module('vfGoogleAnalytics', []).
        factory('GA', ['$window', '$rootScope', '$timeout', function($window, $rootScope, $timeout){
            var ga, s, document = $window.document;

            // adaptation of default google analytics snippet
            if (!document.getElementById('google-analytics-script')) {
                ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.id = 'google-analytics-script';
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            }
            return function(accountId){
                $window._gaq = $window._gaq || [];
                $window._gaq.push(['_setAccount', accountId]);
                $rootScope.$on('$routeChangeSuccess', function(){
                    $timeout(function(){
                        $window._gaq.push(['_trackPageview']);
                    });
                });
            }
        }]);
}(window.angular));