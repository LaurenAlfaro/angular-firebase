module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: {
            'port': 9000,
            'prod_port': 9090,
            'base': 'dist'
        },

        dirs: {
            'app': 'app',
            'app_site_js': '<%= dirs.app %>/js/site',
            'app_vendor_js': '<%= dirs.app %>/js/vendor',
            'app_site_css': '<%= dirs.app %>/css/site',
            'app_vendor_css': '<%= dirs.app %>/css/vendor',
            'dist': 'dist',
            'dist_js': '<%= dirs.dist %>/js',
            'dist_css': '<%= dirs.dist %>/css',
            'docs': 'docs',
            'tmp': '.tmp'
        },

        // Clean folders
        clean: {
            dist: ['<%= dirs.dist %>'],
            tmp: ['<%= dirs.tmp %>'],
            docs: ['<%= dirs.docs %>']
        },

        // JSHint, Code Quality Tool
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files: {
                src: ['Gruntfile.js', '<%= dirs.app_site_js %>/**/*.js']
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
                    src: ['Gruntfile.js', '<%= dirs.app_site_js %>']
                }
            }
        },

        // HTML Hint Code Verifier
        htmlhint: {
            options: {
                htmlhintrc: '.htmlhintrc'
            },
            templates: {
                src: ['<%= dirs.app %>/**/*.html']
            }
        },

        // AngularJS DI Annotation
        ngAnnotate: {
            dist: {
                files: {
                    '<%= dirs.dist_js %>/site.js': ['<%= dirs.dist_js %>/site.js']
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.app %>/images',
                        dest: '<%= dirs.dist %>/images',
                        src: ['{,*/}*.*']
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.app %>/fonts/',
                        dest: '<%= dirs.dist %>/fonts',
                        src: ['{,*/}*.*']
                    }
                ]
            },
            htmls: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.app %>',
                        dest: '<%= dirs.dist %>',
                        src: ['*.html', 'views/{,*/}*.html']
                    }
                ]
            }
        },

        // File Concatenation for JavaScript files
        concat: {
            js: {
                files: {
                    '<%= dirs.dist_js %>/ie-shims.js': [
                        '<%= dirs.app_vendor_js %>/html5shiv.min.js',
                        '<%= dirs.app_vendor_js %>/respond.js'
                    ],
                    '<%= dirs.dist_js %>/libraries.js': [
                        '<%= dirs.app_vendor_js %>/jquery/jquery.min.js',
                        '<%= dirs.app_vendor_js %>/bootstrap/bootstrap.min.js',
                        '<%= dirs.app_vendor_js %>/angular/angular.min.js',
                        '<%= dirs.app_vendor_js %>/angular/angular-animate.min.js',
                        '<%= dirs.app_vendor_js %>/angular/angular-resource.min.js',
                        '<%= dirs.app_vendor_js %>/angular/angular-route.min.js',
                        '<%= dirs.app_vendor_js %>/firebase/firebase.js',
                        '<%= dirs.app_vendor_js %>/firebase/angularfire.min.js'
                    ],
                    '<%= dirs.dist_js %>/site.js': [
                        '<%= dirs.app_site_js %>/*/**/*.module.js',
                        '<%= dirs.app_site_js %>/*/**/*.js',
                        '<%= dirs.app_site_js %>/app.js',
                        '<%= dirs.app_site_js %>/app*.js'
                    ]
                }
            },
            css: {
                files: {
                    '<%= dirs.dist_css %>/site.css': [
                        '<%= dirs.app_site_css %>/**/*.css'
                    ],
                    '<%= dirs.dist_css %>/libraries.css': [
                        '<%= dirs.app_vendor_css %>/**/*.css'
                    ]
                }
            }
        },

        // CSS Minimizer
        cssmin: {
            options: {
                compatibility: 'ie8'
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.dist_css %>',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: '<%= dirs.dist_css %>',
                    ext: '.min.css'
                }]
            }
        },

        // JavaScript Minimizer
        uglify: {
            options: {
                screwIE8: false
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.dist_js %>',
                        src: ['**/*.js', '!**/*.min.js'],
                        dest: '<%= dirs.dist_js %>',
                        ext: '.min.js'
                    }
                ]
            }
        },

        // Setup files minimize
        injector: {
             css: {
                options: {
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector:css -->',
                    transform: function(filePath) {
                        filePath = filePath.replace('/dist/', '').replace('.css', '.min.css');
                        return '<link rel="stylesheet" href="' + filePath + '" />';
                    },
                    template: '<%= dirs.dist %>/index.html'
                },
                files: {
                    '<%= dirs.dist %>/index.html': [
                        '<%= dirs.dist_css %>/**/*.css',
                        '!<%= dirs.dist_css %>/**/*.min.css'
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
                    template: '<%= dirs.dist %>/index.html'
                },
                files: {
                    '<%= dirs.dist %>/index.html': [
                        '<%= dirs.dist_js %>/**/*.js',
                        '!<%= dirs.dist_js %>/**/*.min.js',
                        '!<%= dirs.dist_js %>/**/ie-shims.js'
                    ]
                }
            }
        },

        // Documentation
        ngdocs: {
            options: {
                title: 'AngularFire Documentation',
                dest: '<%= dirs.docs %>'
            },
            all: ['<%= dirs.app_site_js %>/**/*.js', '!<%= dirs.app_site_js %>/**/*.spec.js']
        },

        // Connect server
        connect: {
            options: {
                keepalive: true,
                hostname: 'localhost',
                base: '<%= config.base %>'
            },
            livereload: {
                options: {
                    keepalive: false,
                    livereload: 35729,
                    port: '<%= config.port %>',
                    open: {
                        target: 'http://localhost:<%= config.port %>/'
                    }
                }
            },
            prod: {
                options: {
                    port: '<%= config.prod_port %>',
                    open: {
                        target: 'http://localhost:<%= config.prod_port %>/'
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
                    'Gruntfile.js',
                    '<%= dirs.app_site_js %>/{,*/}*.js',
                    '<%= dirs.app_vendor_js %>/{,*/}*.js'
                ],
                tasks: ['build:js']
            },
            css: {
                files: [
                    '<%= dirs.app_site_css %>/{,*/}*.css',
                    '<%= dirs.app_vendor_css %>/{,*/}*.css'
                ],
                tasks: ['build:css']
            },
            images: {
                files: [
                    '<%= dirs.app %>/images/{,*/}*.*'
                ],
                tasks: ['copy:images']
            },
            fonts: {
                files: [
                    '<%= dirs.app %>/fonts/{,*/}*.*'
                ],
                tasks: ['copy:fonts']
            },
            htmls: {
                files: [
                    '<%= dirs.app %>/{,*/}*.html'
                ],
                tasks: ['build:htmls']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= dirs.app_site_js %>/{,*/}*.js',
                    '<%= dirs.app_vendor_js %>/{,*/}*.js',
                    '<%= dirs.app_site_css %>/{,*/}*.css',
                    '<%= dirs.app_vendor_css %>/{,*/}*.css',
                    '<%= dirs.app %>/images/{,*/}*.*',
                    '<%= dirs.app %>/fonts/{,*/}*.*',
                    '<%= dirs.app %>/{,*/}*.html'
                ]
            }
        }
    });

    // Helper Tasks
    grunt.registerTask('lint', ['jshint', 'jscs']);
    grunt.registerTask('docs', ['clean:docs', 'ngdocs']);
    grunt.registerTask('build:htmls', ['htmlhint', 'copy:htmls']);
    grunt.registerTask('build:static', ['copy:images', 'copy:fonts']);
    grunt.registerTask('build:js', ['lint', 'concat:js', 'ngAnnotate']);
    grunt.registerTask('build:css', ['concat:css']);
    grunt.registerTask('build:optimize', ['cssmin', 'uglify', 'injector']);

    // User Tasks
    grunt.registerTask('build', ['clean:dist', 'build:js', 'build:css', 'build:htmls', 'build:static']);
    grunt.registerTask('build:prod', ['build', 'build:optimize', 'docs', 'clean:tmp']);
    grunt.registerTask('serve', ['build:prod', 'connect:prod']);
    grunt.registerTask('serve:dev', ['build', 'connect:livereload', 'watch']);
};
