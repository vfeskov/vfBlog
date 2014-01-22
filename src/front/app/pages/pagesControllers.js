(function(angular){
    'use strict';

    angular.module('vfPersonalSite.pages')
        .controller('HomeCtrl', ['CtrlInit', function(CtrlInit){
            CtrlInit('JAJ', 'JAJ is a blog about web development, software engineering and stuff')
        }])
        .controller('AboutCtrl', ['CtrlInit', function(CtrlInit){
            CtrlInit('About - JAJ', 'JAJ is Just Another JAJ');
        }]);
}(window.angular));