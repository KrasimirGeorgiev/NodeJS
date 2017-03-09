'use strict';

module.exports = function (grunt) {

    var devPort = 9578;
    var reloadPort = 35729;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // =======================
        // DEV VARIABLES =========
        // =======================
        dev: {
            scripts: ['dev/scripts/**/*.js'],
            css: ['dev/styles/**/*.css']
        },
        // =======================
        // COFFEE-SCRIPT CONFIG ==
        // =======================
        coffee: {
          dev: {
              files: [{
                  expand: true,
                  cwd: 'app/coffee',
                  src: ['**/*.coffee'],
                  dest: 'dev/scripts',
                  ext: '.js'
              }]
          }
        },
        // =======================
        // JADE CONFIG ===========
        // =======================
        jade: {
            dev: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['**/*.jade', '!layout.jade'],
                    dest: 'dev/',
                    ext: '.html'
                }]
            }
        },
        // =======================
        // STYLUS CONFIG =========
        // =======================
        stylus: {
            dev: {
                options: {
                    compress: false
                },
                files: [{
                    expand: true,
                    cwd: 'app/stylus',
                    src: ['**/*.styl'],
                    dest: 'dev/styles',
                    ext: '.css'
                }]
            },
            serve: {},

            test: {},

            build: {}
        },
        // =======================
        // CSS-LINT CONFIG ========
        // =======================
        csslint: {
            lint: {
                src: ['dev/styles/**/*.css']
            }
        },
        // =======================
        // COPY CONFIG ===========
        // =======================
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'app/images/',
                    src: ['**'],
                    dest: 'dev/images'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['images/**', '**/*.html'],
                    dest: 'dist/'
                }]
            }
        },
        // =======================
        // JSHINT CONFIG =========
        // =======================
        jshint: {
            lint: {
                src: 'dev/scripts/**/*.js'
            },
        },
        // =======================
        // CONNECT CONFIG ========
        // =======================
        connect: {
            dev: {
                options: {
                    port: devPort,
                    livereload: reloadPort,
                    hostname: 'localhost',
                    base: 'dev/'
                },
                livereload: {
                    options: {
                        open: true,
                        base: ['app']
                    }
                }
            }
        },
        // =======================
        // WATCH CONFIG ==========
        // =======================
        watch: {
            options: {
                livereload: reloadPort
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'dev/**/*.html',
                    'dev/styles/**/*.css',
                    'dev/scripts/**/*.js'
                ]
            },
            coffee: {
              files: ['app/coffee/**/*.coffee'],
                // the created js files linting is done here
                tasks: ['newer:coffee:dev', 'newer:jshint']
            },
            stylus: {
                files: ['app/stylus/**/*.styl'],
                tasks: ['newer:stylus:dev']
            },
            views: {
                files: ['app/**/*.jade'],
                tasks: ['jade:dev'] // removed newer: because changes to layout are not reflection
            },
            includeSource: {
                files: ['dev/scripts/**/*.js', 'dev/styles/**/*.js'],
                tasks: ['includeSource'],
                options: {
                    event:['added', 'deleted']
                }
            }
        },
        // =======================
        // AUTO-INCLUDE CONFIG ===
        // =======================
        includeSource: {
            options: {
                ordering: 'top-down',
                templates: {
                    jade: {
                        js: 'script(src="{filePath}", type="text/javascript")',
                        css: 'link(href="{filePath}", rel="stylesheet", type="text/css")'
                    }
                },
                // Removes the 'dev/' prefix of the path
                rename: function (dest, matched) {
                    return matched.substr('dev/'.length);
                }
            },
            targets: {
                // this main template hold all the style and script references and is applied to all pages
                files: {'app/layout.jade': 'app/layout.jade'}
            }
        },
        // =======================
        // PROCESS-HTML CONFIG ===
        // FOR DISTRIBUTION ======
        // =======================
        processhtml: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['**/*.html'],
                    dest: 'dist/',
                    ext: '.html'
                }]
            }
        },
        // =======================
        // CONCAT CONFIG =========
        // =======================
        concat: {
            js: {
                src: 'dev/scripts/**/*.js',
                dest: 'temp/js/scripts.js'
            },
            css: {
                src: 'dev/styles/**/*.css',
                dest: 'temp/css/style.css'
            }
        },
        // =======================
        // MIN CONFIG ============
        // =======================
        uglify: {
            js: {
                src: 'temp/js/scripts.js',
                dest: 'dist/scripts/scripts.min.js'
            }
        },
        cssmin: {
            css:{
                src: 'temp/css/style.css',
                dest: 'dist/styles/style.min.css'
            }
        },
        // =======================
        // CLEAN CONFIG ==========
        // =======================
        clean: {
            temp: {
                src: ['temp']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('compile', [
        'newer:stylus:dev',
        'jade:dev', // not using newer because there are problems with the shared layout.jade file
        'newer:coffee:dev',
        'newer:copy:dev',
        'includeSource',
    ]);

    grunt.registerTask('serve', [
        'compile',
        'jshint',
        'connect:dev',
        'watch']);

    grunt.registerTask('build', [
        'compile',
        'jshint',
        // 'csslint',
        'concat:js',
        'concat:css',
        'copy:dist',
        'uglify:js',
        'cssmin:css',
        'processhtml:dist',
        'clean:temp'
    ]);

    grunt.registerTask('default', ['serve']);
};