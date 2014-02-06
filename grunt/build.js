var fs = require('fs'),
    bowerDeps = require('./build/bower-deps.js');
module.exports = function (params) {
    var grunt = params.grunt,
        bowerBundleHash = bowerDeps.bundleHash(),
        appBowerJson = grunt.file.readJSON('bower.json'),
        appName = appBowerJson.name,
        version = appBowerJson.version;

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        clean: {
            public: {
                src: 'public'
            },
            tmp: {
                src: 'tmp'
            }
        },
        copy: {
            public: {
                files: [
                    {
                        src: ['assets/**/*.*', '!assets/**/*.css', 'robots.txt', '!posts_content/**/*.html', '**/*.json', '**/*.xml', '!modules/**/*.html'],
                        dest: 'public',
                        cwd: 'src/front',
                        expand: true
                    },
                    {
                        src: '*.*',
                        dest: 'public/assets/fonts',
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        expand: true
                    }
                ]
            },
            posts: {
                src: 'posts_content/**/*.html',
                dest: 'public',
                cwd: 'src/front',
                expand: true,
                options: {
                    process: require('./build/highlight.js')
                }
            }
        },
        jshint: {
            options: {
                jshintrc: 'grunt/build/.jshintrc'
            },
            gruntfile: [
                'Gruntfile.js'
            ],
            frontend: 'src/front/modules/**/*.js'
        },
        htmlmin: {
            index: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public/index.html': 'src/front/index.html'
                }
            }
        },
        html2js: {
            app: {
                options: {
                    base: 'src/front/modules',
                    module: 'templates'
                },
                src: 'src/front/modules/**/*.html',
                dest: 'tmp/templates.js'
            }
        },
        recess: {
            bootstrap: {
                options: {
                    compile: true,
                    includePath: 'bower_components/bootstrap/less'
                },
                files: {
                    'bower_components/bootstrap/dist/css/bootstrap-custom.css': ['grunt/build/bootstrap.less']
                }
            }
        },
        cssmin: {
            bootstrap: {
                options: {
                    banner: '/*!\n * Bootstrap v3.0.3 (http://getbootstrap.com)\n * Copyright 2013 Twitter, Inc.\n * Licensed under http://www.apache.org/licenses/LICENSE-2.0\n */'
                },
                expand: true,
                cwd: 'bower_components/bootstrap/dist/css/',
                src: 'bootstrap-custom.css',
                dest: 'bower_components/bootstrap/dist/css/',
                ext: '.min.css'
            },
            highlightjs: {
                options: {
                    banner: '/*\n * Intellij Idea-like styling (c) Vasily Polovnyov <vast@whiteants.net>\n */'
                },
                expand: true,
                cwd: 'bower_components/highlight.js/src/styles/',
                src: ['*.css', '!*.min.css'],
                dest: 'bower_components/highlight.js/src/styles/',
                ext: '.min.css'
            },
            app: {
                options: {
                    banner: '/*\n * vfBlog v.' + version + '\n * (c) 2014 Vladimir Feskov http://vfeskov.com\n * License: MIT\n */'
                },
                src: ['src/front/assets/**/*.css'],
                dest: 'public/assets/css/' + appName + version + '.min.css'
            }
        },
        concat: {
            options: {
                process: function(src) {
                    return src.replace(/^\/\/.*?sourceMappingURL=.*$/gm, '');
                }
            },
            bootstrap: {
                src: require('./build/bootstrap.js'),
                dest: 'bower_components/bootstrap/dist/js/bootstrap-custom.js'
            },
            app: {
                src: ['tmp/templates.js', 'src/front/modules/**/*.js'],
                dest: 'tmp/app.js'
            },
            bowerjs: {
                src: bowerDeps.js('min'),
                dest: 'public/assets/js/bower-components-' + bowerBundleHash + '.min.js'
            },
            bowercss: {
                src: bowerDeps.css('min'),
                dest: 'public/assets/css/bower-components-' + bowerBundleHash + '.min.css'
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            app: {
                options: {
                    banner: '/*\n * vfBlog v.' + version + '\n * (c) 2014 Vladimir Feskov http://vfeskov.com\n * License: MIT\n */\n'
                },
                src: 'tmp/app.js',
                dest: 'public/assets/js/' + appName + version + '.min.js'
            },
            bootstrap: {
                options: {
                    banner: '/*!\n * Bootstrap v3.0.3 (http://getbootstrap.com)\n * Copyright 2013 Twitter, Inc.\n * Licensed under http://www.apache.org/licenses/LICENSE-2.0\n */\n'
                },
                src: 'bower_components/bootstrap/dist/js/bootstrap-custom.js',
                dest: 'bower_components/bootstrap/dist/js/bootstrap-custom.min.js'
            }
        }
    });

    grunt.registerTask('insert', function () {
        var indexHtml = __dirname + '/../public/index.html',
            html = fs.readFileSync(indexHtml).toString(), links = '', scripts = '';

        function insertBeforeHead(html, code){ //need this because can't use replace - dollar sign in angular code is considered a special character https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FString%2Freplace#Specifying_a_string_as_a_parameter
            var headPos = html.indexOf('</head>');
            return html.substr(0, headPos) + code + html.substr(headPos);
        }

        ['bower-components-' + bowerBundleHash + '.min', appName + version + '.min'].forEach(function(link){
            links += '<link rel="stylesheet" href="/assets/css/' + link + '.css" />';
            scripts += '<script src="/assets/js/' + link + '.js"></script>';
        });

        html = insertBeforeHead(html, links);
        html = insertBeforeHead(html, scripts);

        fs.writeFileSync(indexHtml, html);
    });

    grunt.task.run([
        'jshint', 'clean', 'copy', 'htmlmin', 'html2js', 'concat:app', 'concat:bootstrap', 'uglify', 'concat:bowerjs', 'recess', 'cssmin', 'concat:bowercss', 'insert', 'clean:tmp'
    ]);
};