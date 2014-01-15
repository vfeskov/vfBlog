var async = require('async'),
    fs = require('fs'),
    _ = require('lodash');

module.exports = function (grunt) {
    'use strict';


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-develop');

    grunt.initConfig({
        clean: {
            public: {
                src: 'public'
            },
            tmp: {
                src: 'tmp'
            },
            seo: {
                src: 'snapshots/**/*.html'
            }
        },
        copy: {
            public: {
                files: [
                    {
                        src: ['assets/**/*.*', '!assets/**/*.css', '**/*.html', '**/*.json', '**/*.xml', '!views/**/*.html'],
                        dest: 'public',
                        cwd: 'src',
                        expand: true
                    },
                    {
                        src: ['angular.min.js.map'],
                        dest: 'public',
                        cwd: 'bower_components/angular',
                        expand: true
                    }
                ]
            },
            seo: {
                files: [
                    {
                        src: 'seo/sitemap.xml',
                        dest: 'snapshots/sitemap.xml'
                    },
                    {
                        src: 'seo/sitemap.xml',
                        dest: 'public/sitemap.xml'
                    }
                ]
            }
        },
        html2js: {
            app: {
                options: {
                    base: 'src/views',
                    module: 'vfPersonalSite.templates'
                },
                src: 'src/views/**/*.html',
                dest: 'tmp/templates.js'
            }
        },
        concat: {
            options: {
            },
            css: {
                src: ['bower_components/highlight.js/src/styles/idea.css', 'src/assets/**/*.css'],
                dest: 'tmp/all.css'
            },
            app: {
                src: ['tmp/templates.js', 'src/app/**/*.js'],
                dest: 'tmp/app.js'
            },
            vendor: {
                src: [
                    'bower_components/lodash/dist/lodash.underscore.min.js',
                    'bower_components/highlight.js/build/highlight.pack.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-disqus/angular-disqus.min.js'
                    /*'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap.min.js',*/
                ],
                dest: 'tmp/vendor.js'
            },
            all: {
                src: ['tmp/vendor.js', 'tmp/app.min.js'],
                dest: 'tmp/all.js'
            }
        },
        uglify: {
            options: {
                banner: '/*\n vfPersonalSite v.0.1.0\n (c) 2014 Vladimir Feskov http://vfeskov.com\n License: MIT\n*/\n',
                mangle: true
            },
            app: {
                src: 'tmp/app.js',
                dest: 'tmp/app.min.js'
            }
        },
        develop: {
            server: {
                file: 'vfPersonalSite.js',
                env: { PORT: '7854'}
            },
            options: {
                nospawn: true
            }
        }
    });


    //'python tools/build.py -tamd javascript nginx json php xml css apache coffescript http ini sql'


    grunt.registerTask('appendAssets', function () {
        var indexHtml = __dirname + '/public/index.html',
            html = fs.readFileSync(indexHtml).toString(),
            js = fs.readFileSync(__dirname + '/tmp/all.js').toString(),
            css = fs.readFileSync(__dirname + '/tmp/all.css').toString();
        html = html.replace('</body>', '<script>\n' + js + '\n</script>\n</body>');
        html = html.replace('</head>', '<style>\n' + css + '\n</style>\n</head>');
        fs.writeFileSync(indexHtml, html);
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
                return 'phantomjs ./seo/snapshotsMaker.js ' + params.url + ' > ' + params.saveTo;
            });

        if(!fs.existsSync(__dirname + '/snapshots')){
            fs.mkdirSync(__dirname + '/snapshots');
        }
        if(!fs.existsSync(__dirname + '/snapshots/posts')){
            fs.mkdirSync(__dirname + '/snapshots/posts');
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

    grunt.registerTask('build', [
        'clean:public', 'clean:tmp', 'copy:public', 'html2js', 'concat:app', 'uglify:app', 'concat:vendor', 'concat:css', 'concat:all', 'appendAssets', 'clean:tmp'
    ]);

    grunt.registerTask('seo', [
        'clean:seo', 'copy:seo', 'develop', 'snapshots'
    ]);

    grunt.registerTask('default', [
        'build', 'seo'
    ]);

};
