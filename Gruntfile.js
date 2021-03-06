module.exports = function (grunt) {
    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: {
            'port': 9000,
            'port_prod': 9001,
            'port_docs': 9002
        },

        dirs: {
            'app': 'app',
            'app_js': '<%= dirs.app %>/js',
            'app_js_site': '<%= dirs.app_js %>/site',
            'app_js_vendor': '<%= dirs.app_js %>/vendor',
            'app_css': '<%= dirs.app %>/css',
            'app_css_site': '<%= dirs.app_css %>/site',
            'app_css_vendor': '<%= dirs.app_css %>/vendor',
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
                src: [
                    'Gruntfile.js',
                    '<%= dirs.app_js_site %>/{,**/}*.js'
                ]
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
                    src: [
                        'Gruntfile.js',
                        '<%= dirs.app_js_site %>'
                    ]
                }
            }
        },

        // HTML Hint Code Verifier
        htmlhint: {
            options: {
                htmlhintrc: '.htmlhintrc'
            },
            templates: {
                src: ['<%= dirs.app %>/{,**/}*.html']
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
                        src: ['{,**/}*.*']
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.app %>/fonts/',
                        dest: '<%= dirs.dist %>/fonts',
                        src: ['{,**/}*.*']
                    }
                ]
            },
            htmls: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.app %>',
                        dest: '<%= dirs.dist %>',
                        src: ['*.html', 'views/{,**/}*.html']
                    }
                ]
            }
        },

        // File Concatenation for JavaScript files
        concat: {
            js: {
                files: {
                    '<%= dirs.dist_js %>/ie-shims.js': [
                        '<%= dirs.app_js_vendor %>/html5shiv.min.js',
                        '<%= dirs.app_js_vendor %>/respond.min.js'
                    ],
                    '<%= dirs.dist_js %>/libraries.js': [
                        '<%= dirs.app_js_vendor %>/jquery/jquery.min.js',
                        '<%= dirs.app_js_vendor %>/bootstrap/bootstrap.min.js',
                        '<%= dirs.app_js_vendor %>/angular/angular.min.js',
                        '<%= dirs.app_js_vendor %>/angular/angular-animate.min.js',
                        '<%= dirs.app_js_vendor %>/angular/angular-resource.min.js',
                        '<%= dirs.app_js_vendor %>/angular/angular-route.min.js',
                        '<%= dirs.app_js_vendor %>/firebase/firebase.min.js',
                        '<%= dirs.app_js_vendor %>/firebase/angularfire.min.js'
                    ],
                    '<%= dirs.dist_js %>/site.js': [
                        '<%= dirs.app_js_site %>/*/{,**/}*.module.js',
                        '<%= dirs.app_js_site %>/*/{,**/}*.js',
                        '<%= dirs.app_js_site %>/app.js',
                        '<%= dirs.app_js_site %>/{,**/}app.*.js',
                        '!<%= dirs.app_js_site %>/*/{,**/}*.spec.js'
                    ]
                }
            },
            css: {
                files: {
                    '<%= dirs.dist_css %>/site.css': [
                        '<%= dirs.app_css_site %>/{,**/}*.css'
                    ],
                    '<%= dirs.dist_css %>/libraries.css': [
                        '<%= dirs.app_css_vendor %>/{,**/}*.css'
                    ]
                }
            }
        },

        // CSS Minimizer
        cssmin: {
            options: {
                compatibility: 'ie8'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.dist_css %>',
                    src: ['{,**/}*.css', '!{,**/}*.min.css'],
                    dest: '<%= dirs.dist_css %>',
                    ext: '.min.css'
                }]
            }
        },

        // JavaScript Minimizer
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                screwIE8: false
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.dist_js %>',
                        src: ['{,**/}*.js', '!{,**/}*.min.js'],
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
                        '<%= dirs.dist_css %>/{,**/}*.css',
                        '!<%= dirs.dist_css %>/{,**/}*.min.css'
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
                        '<%= dirs.dist_js %>/{,**/}*.js',
                        '!<%= dirs.dist_js %>/{,**/}*.min.js',
                        '!<%= dirs.dist_js %>/{,**/}ie-shims.js'
                    ]
                }
            }
        },

        // Documentation
        ngdocs: {
            options: {
                title: 'Angular Firebase Documentation',
                dest: '<%= dirs.docs %>',
                editLink: false
            },
            all: [
                '<%= dirs.app_js_site %>/{,**/}*.js',
                '!<%= dirs.app_js_site %>/{,**/}*.spec.js'
            ]
        },

        // Connect server
        connect: {
            options: {
                keepalive: true,
                hostname: 'localhost',
                base: '<%= dirs.dist %>'
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
                    port: '<%= config.port_prod %>',
                    open: {
                        target: 'http://localhost:<%= config.port_prod %>/'
                    }
                }
            },
            docs: {
                options: {
                    port: '<%= config.port_docs %>',
                    base: '<%= dirs.docs %>',
                    open: {
                        target: 'http://localhost:<%= config.port_docs %>/'
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
                    '<%= dirs.app_js %>/{,**/}*.js'
                ],
                tasks: ['build:js']
            },
            css: {
                files: [
                    '<%= dirs.app_css %>/{,**/}*.css'
                ],
                tasks: ['build:css']
            },
            images: {
                files: [
                    '<%= dirs.app %>/images/{,**/}*.*'
                ],
                tasks: ['copy:images']
            },
            fonts: {
                files: [
                    '<%= dirs.app %>/fonts/{,**/}*.*'
                ],
                tasks: ['copy:fonts']
            },
            htmls: {
                files: [
                    '<%= dirs.app %>/{,**/}*.html'
                ],
                tasks: ['build:htmls']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= dirs.app_js %>/{,**/}*.js',
                    '<%= dirs.app_css %>/{,**/}*.css',
                    '<%= dirs.app %>/images/{,**/}*.*',
                    '<%= dirs.app %>/fonts/{,**/}*.*',
                    '<%= dirs.app %>/{,**/}*.html'
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
    grunt.registerTask('build:prod', ['build', 'build:optimize', 'clean:tmp']);
    grunt.registerTask('serve', ['build:prod', 'connect:prod']);
    grunt.registerTask('serve:dev', ['build', 'connect:livereload', 'watch']);
    grunt.registerTask('serve:docs', ['docs', 'connect:docs']);
};
