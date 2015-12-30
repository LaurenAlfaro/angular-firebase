module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: {
            connectPort: 9000,
            base: '/',
            app: 'app',
            appSiteJS: '<%= config.app %>/js/site',
            appVendorJS: '<%= config.app %>/js/vendor',
            appSiteCSS: '<%= config.app %>/css/site',
            appVendorCSS: '<%= config.app %>/css/vendor',
            dist: 'dist',
            distJS: '<%= config.dist %>/js',
            distCSS: '<%= config.dist %>/css',
            docs: 'docs',
            tmp: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files: {
                src: ['Gruntfile.js', '<%= config.appSiteJS %>/**/*.js']
            }
        },


        // JavaScript Code Sniffer, Code Syntax Verifier Tool
        jscs: {
            all: {
                options: {
                    standard: 'Idiomatic',
                    reportFull: true
                },
                files: {
                    src: ['Gruntfile.js', '<%= config.appSiteJS %>']
                }
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: {
                    '<%= config.distJS %>/site.js': ['<%= config.distJS %>/site.js']
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['<%= config.dist %>']
                }]
            },
            tmp: {
                files: [{
                    dot: true,
                    src: ['<%= config.tmp %>']
                }]
            },
        },

        // Copies remaining files to places other tasks can use
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        dest: '<%= config.dist %>/images',
                        src: ['images/{,*/}*.*']
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/fonts',
                        dest: '<%= config.dist %>/fonts',
                        src: ['fonts/{,*/}*.*']
                    }
                ]
            },
            htmls: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.dist %>',
                        src: ['*.html', 'views/{,*/}*.html']
                    }
                ]
            }
        },

        // File Concatenation for JavaScript files
        concat: {
            js: {
                files: {
                    '<%= config.distJS %>/ie-shims.js': [
                        '<%= config.appVendorJS %>/html5shiv.min.js',
                        '<%= config.appVendorJS %>/respond.js'
                    ],
                    '<%= config.distJS %>/libraries.js': [
                        '<%= config.appVendorJS %>/jquery/jquery.min.js',
                        '<%= config.appVendorJS %>/bootstrap/bootstrap.min.js',
                        '<%= config.appVendorJS %>/angular/angular.min.js',
                        '<%= config.appVendorJS %>/angular/angular-animate.min.js',
                        '<%= config.appVendorJS %>/angular/angular-resource.min.js',
                        '<%= config.appVendorJS %>/angular/angular-route.min.js',
                        '<%= config.appVendorJS %>/firebase/firebase.js',
                        '<%= config.appVendorJS %>/firebase/angularfire.min.js'
                    ],
                    '<%= config.distJS %>/site.js': [
                        '<%= config.appSiteJS %>/*/**/*.module.js',
                        '<%= config.appSiteJS %>/*/**/*.js',
                        '<%= config.appSiteJS %>/app.js',
                        '<%= config.appSiteJS %>/app*.js'
                    ]
                }
            },
            css: {
                files: {
                    '<%= config.distCSS %>/site.css': [
                        '<%= config.appSiteCSS %>/**/*.css'
                    ],
                    '<%= config.distCSS %>/libraries.css': [
                        '<%= config.appVendorCSS %>/**/*.css'
                    ]
                }
            }
        },

        /* CSS Minimizer */
        cssmin: {
            options: {
                compatibility: 'ie8'
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= config.distCSS %>',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: '<%= config.distCSS %>',
                    ext: '.min.css'
                }]
            }
        },

        /* JavaScript Minimizer */
        uglify: {
            options: {
                screwIE8: false
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.distJS %>',
                        src: ['**/*.js', '!**/*.min.js'],
                        dest: '<%= config.distJS %>',
                        ext: '.min.js'
                    }
                ]
            }
        },

        injector: {
             css: {
                options: {
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector:css -->',
                    transform: function(filePath) {
                        filePath = filePath.replace('/dist/', '').replace('.css', '.min.css');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    template: '<%= config.dist %>/index.html'
                },
                files: {
                    '<%= config.dist %>/index.html': [
                        '<%= config.distCSS %>/**/*.css',
                        '!<%= config.distCSS %>/**/*.min.css'
                    ]
                }
            },
            js: {
                options: {
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector:js -->',
                    transform: function(filePath) {
                        filePath = filePath.replace('/dist/', '').replace('.js', '.min.js');
                        return '<script src="' + filePath + '"></script>';
                    },
                    template: '<%= config.dist %>/index.html'
                },
                files: {
                    '<%= config.dist %>/index.html': [
                        '<%= config.distJS %>/**/*.js',
                        '!<%= config.distJS %>/**/*.min.js',
                        '!<%= config.distJS %>/**/ie-shims.js'
                    ]
                }
            }
        },


        /* Documentation */
        jsdoc: {
            dist: {
                src: ['<%= config.appSiteJS %>/**/*.js', '!<%= config.appSiteJS %>/**/*.spec.js'],
                options: {
                    destination: '<%= config.docs %>',
                    readme: './README.md'
                }
            }
        },

        connect: {
            options: {
                keepalive: true,
                port: '<%= config.connectPort %>',
                hostname: 'localhost',
                livereload: 35729,
                base: '<%= config.dist %>'
            },
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:<%= config.connectPort %>/'
                    }
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [
                    '<%= config.appSiteJS %>/{,*/}*.js',
                    '<%= config.appVendorJS %>/{,*/}*.js'
                ],
                tasks: ['build:js']
            },
            css: {
                files: [
                    '<%= config.appSiteCSS %>/{,*/}*.css',
                    '<%= config.appVendorCSS %>/{,*/}*.css'
                ],
                tasks: ['build:css']
            },
            images: {
                files: [
                    '<%= config.app %>/images/{,*/}*.*'
                ],
                tasks: ['copy:images']
            },
            fonts: {
                files: [
                    '<%= config.app %>/fonts/{,*/}*.*'
                ],
                tasks: ['copy:fonts']
            },
            htmls: {
                files: [
                    '<%= config.app %>/{,*/}*.html'
                ],
                tasks: ['copy:htmls']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.appSiteJS %>/{,*/}*.js',
                    '<%= config.appVendorJS %>/{,*/}*.js',
                    '<%= config.appSiteCSS %>/{,*/}*.css',
                    '<%= config.appVendorCSS %>/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*.*',
                    '<%= config.app %>/fonts/{,*/}*.*',
                    '<%= config.app %>/{,*/}*.html'
                ]
            }
        }
    });

    // Helper Tasks
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('build:static', ['copy:images', 'copy:fonts', 'copy:htmls']);
    grunt.registerTask('build:js', ['lint', 'concat:js', 'ngAnnotate']);
    grunt.registerTask('build:css', ['concat:css']);
    grunt.registerTask('build:optimize', ['cssmin', 'uglify', 'injector']);

    // User Tasks
    grunt.registerTask('build', ['clean:dist', 'build:js', 'build:css', 'build:static']);
    grunt.registerTask('build:prod', ['build', 'build:optimize', 'jsdoc', 'clean:tmp']);
    grunt.registerTask('serve', ['build', 'connect', 'watch']);
    grunt.registerTask('serve:prod', ['build:prod', 'connect']);
};
