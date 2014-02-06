var fs = require('fs'),
    bowerDeps = require('./build/bower-deps.js');
module.exports = function(params){
    var grunt = params.grunt,
        args = params.args || [];

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-develop');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
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
                        src: ['assets/**/*.*', '!assets/**/*.css', '**/*.html', '!posts_content/**/*.html', '**/*.json', '**/*.xml', '!modules/**/*.html'],
                        dest: 'public',
                        cwd: 'src/front',
                        expand: true
                    },
                    {
                        src: ['app.js', 'all.css'],
                        dest: 'public',
                        cwd: 'tmp',
                        expand: true
                    }
                ]
            },
            bowers: {
                src: 'bower_components/**/*.*',
                dest: 'public',
                expand: true
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
                expand: true,
                cwd: 'bower_components/bootstrap/dist/css/',
                src: 'bootstrap-custom.css',
                dest: 'bower_components/bootstrap/dist/css/',
                ext: '.min.css'
            },
            highlightjs: {
                expand: true,
                cwd: 'bower_components/highlight.js/src/styles/',
                src: ['*.css', '!*.min.css'],
                dest: 'bower_components/highlight.js/src/styles/',
                ext: '.min.css'
            }
        },
        concat: {
            bootstrap: {
                src: require('./build/bootstrap.js'),
                dest: 'bower_components/bootstrap/dist/js/bootstrap-custom.js'
            },
            css: {
                src: 'src/front/assets/**/*.css',
                dest: 'tmp/all.css'
            },
            app: {
                src: ['tmp/templates.js', 'src/front/modules/**/*.js'],
                dest: 'tmp/app.js'
            }
        },
        develop: {
            server: {
                file: 'src/back/server.js'
            },
            options: {
                nospawn: true
            }
        },

        watch: {
            all: {
                files: ['src/front/**/*.*', 'grunt/build/**/*.*'],
                tasks: [
                    'build-dev:rebuild'
                ]
            }
        }
    });

    grunt.registerTask('insert', function () {
        var indexHtml = __dirname + '/../public/index.html',
            html = fs.readFileSync(indexHtml).toString(),
            scripts = '',
            links = '';
        bowerDeps.js('reg').concat(['app.js']).forEach(function(src){
            scripts += '<script src="/' + src + '"></script>\n';
        });

        bowerDeps.css('reg').concat(['all.css']).forEach(function(href){
            links += '<link rel="stylesheet" href="/' + href + '" type="text/css" />\n';
        });

        html = html.replace('</head>', '\n' + links + '</head>');
        html = html.replace('</head>', '\n' + scripts + '</head>');
        fs.writeFileSync(indexHtml, html);
    });


    if(args[0] === 'rebuild'){
        grunt.task.run([
            'jshint', 'html2js', 'concat', 'copy:public', 'copy:posts', 'insert', 'clean:tmp'
        ]);
    } else {
        grunt.task.run([
            'jshint', 'clean', 'html2js', 'recess', 'concat', 'cssmin', 'copy', 'insert', 'clean:tmp', 'develop', 'watch'
        ]);
    }

};