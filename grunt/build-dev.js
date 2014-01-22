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
                        src: ['assets/**/*.*', '!assets/**/*.css', '**/*.html', '!posts/**/*.html', '**/*.json', '**/*.xml', '!views/**/*.html'],
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
                src: 'posts/**/*.html',
                dest: 'public',
                cwd: 'src/front',
                expand: true,
                options: {
                    process: require('./build/highlight.js')
                }
            }
        },
        html2js: {
            app: {
                options: {
                    base: 'src/front/views',
                    module: 'vfPersonalSite.templates'
                },
                src: 'src/front/views/**/*.html',
                dest: 'tmp/templates.js'
            }
        },
        concat: {
            options: {
            },
            css: {
                src: 'src/front/assets/**/*.css',
                dest: 'tmp/all.css'
            },
            app: {
                src: ['tmp/templates.js', 'src/front/app/**/*.js'],
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
                files: ['src/front/**/*.*'],
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
            'html2js', 'concat', 'copy:public', 'copy:posts', 'insert', 'clean:tmp'
        ]);
    } else {
        grunt.task.run([
            'clean', 'html2js', 'concat', 'copy', 'insert', 'clean:tmp', 'develop', 'watch'
        ]);
    }

};