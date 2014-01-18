var async = require('async'),
    fs = require('fs'),
    _ = require('lodash');
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('build', 'builds public folder for production', function () {
        require('./grunt/build.js')({grunt: grunt});
    });

    grunt.registerTask('build-dev', 'builds public folder for development', function () {
        require('./grunt/build-dev.js')({
            grunt: grunt,
            args: arguments
        });
    });

    grunt.registerTask('seo', 'builds snapshots folder for search engine crawlers (PhantomJS required)', function () {
        require('./grunt/seo.js')({
            grunt: grunt
        });
    });

    grunt.registerTask('restart-forever', 'restarts forever', function(){
        var exec = require('child_process').exec,
            callback = this.async(),
            commands = [
                'forever stop src/back/server.js',
                'forever start src/back/server.js'
            ];

        async.mapSeries(commands, function (command, next) {
            grunt.log.writeln(command);
            exec(command, next);
        }, function (err, results) {
            results.forEach(function (result) {
                grunt.log.writeln(result);
            });

            if (err) {
                grunt.log.error(err);
                return callback(false);
            }

            return callback();
        });
    });

    grunt.registerTask('default', [
        'build', 'seo'
    ]);
};
