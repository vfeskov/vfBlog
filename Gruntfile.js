var async = require('async'),
    _ = require('lodash');

module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('snapshots', 'generate snapshots for search crawlers', function () {
        var exec = require('child_process').exec,
            callback = this.async(),
            phantomJSParams = [
                {
                    url: 'http://localhost:3654',
                    saveTo: './snapshots/index.html'
                },
                {
                    url: 'http://localhost:3654/posts',
                    saveTo: './snapshots/posts.html'
                },
                {
                    url: 'http://localhost:3654/about',
                    saveTo: './snapshots/about.html'
                },
                {
                    url: 'http://localhost:3654/posts/file-upload-via-iframe-ajax-and-flash',
                    saveTo: './snapshots/posts/file-upload-via-iframe-ajax-and-flash.html'
                }
                ,
                {
                    url: 'http://localhost:3654/posts/angularjs-html5-mode-setup-use-and-seo',
                    saveTo: './snapshots/posts/angularjs-html5-mode-setup-use-and-seo.html'
                }
            ],
            snapshotCommands = _.map(phantomJSParams, function(params){
                return 'phantomjs ./.phantomjs-runner.js ' + params.url + ' > ' + params.saveTo;
            });

        async.mapSeries(snapshotCommands, function (command, next) {
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
};
