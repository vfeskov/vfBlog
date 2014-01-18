module.exports = function (grunt) {
    'use strict';

    var bowerComponents = [
            'bower_components/lodash/dist/lodash.underscore.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-disqus/angular-disqus.js'
        ],
        bowerComponentsCompressed = [
            'bower_components/lodash/dist/lodash.underscore.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-disqus/angular-disqus.min.js'
        ];

    grunt.registerTask('build', 'builds public folder for production', function () {
        require('./grunt/build.js')({
            grunt: grunt,
            bowerComponents: bowerComponentsCompressed
        });
    });

    grunt.registerTask('build-dev', 'builds public folder for development', function () {
        require('./grunt/build-dev.js')({
            grunt: grunt,
            bowerComponents: bowerComponents,
            args: arguments
        });
    });

    grunt.registerTask('seo', 'builds snapshots folder for search engine crawlers (PhantomJS required)', function () {
        require('./grunt/seo.js')({
            grunt: grunt
        });
    });

    grunt.registerTask('default', [
        'build', 'seo'
    ]);
};
