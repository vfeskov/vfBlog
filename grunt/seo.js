var async = require('async'),
    fs = require('fs'),
    _ = require('lodash');
module.exports = function(params){
    var grunt = params.grunt;

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-develop');

    grunt.initConfig({
        clean: {
            snapshots: {
                src: 'snapshots'
            }
        },
        develop: {
            server: {
                file: 'src/back/server.js',
                env: { PORT: '7854'}
            },
            options: {
                nospawn: true
            }
        }
    });

    grunt.registerTask('snapshots', 'generate snapshots for search crawlers', function () {
        var exec = require('child_process').exec,
            callback = this.async(),
            phantomJSParams = [
                {
                    url: 'http://localhost:7854',
                    saveTo: './snapshots/index.html'
                },
                {
                    url: 'http://localhost:7854/posts',
                    saveTo: './snapshots/posts.html'
                },
                {
                    url: 'http://localhost:7854/about',
                    saveTo: './snapshots/about.html'
                },
                {
                    url: 'http://localhost:7854/posts/file-upload-via-iframe-ajax-and-flash',
                    saveTo: './snapshots/posts/file-upload-via-iframe-ajax-and-flash.html'
                }
                ,
                {
                    url: 'http://localhost:7854/posts/angularjs-html5-mode-setup-use-and-seo',
                    saveTo: './snapshots/posts/angularjs-html5-mode-setup-use-and-seo.html'
                }
            ],
            snapshotCommands = _.map(phantomJSParams, function(params){
                return 'phantomjs ./grunt/seo/snapshots-maker.js ' + params.url + ' > ' + params.saveTo;
            });

        if(!fs.existsSync(__dirname + '/../snapshots')){
            fs.mkdirSync(__dirname + '/../snapshots');
        }
        if(!fs.existsSync(__dirname + '/../snapshots/posts')){
            fs.mkdirSync(__dirname + '/../snapshots/posts');
        }

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

    grunt.task.run([
        'clean', 'develop', 'snapshots'
    ]);
};