'use strict';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// clean workspace
		clean: {
			tmp: ['tmp'],
			scripts: ['tmp/*.js', './*.min.js', '!./Gruntfile.js', './*.min.js.map'],
			styles: ['./*.css', './*.min.css.map']
		},
		// compile less sources
		less: {
			styles: {
				options: {
					plugins: [
                        new (require('less-plugin-clean-css'))()
                    ],
					sourceMap: true,
					sourceMapFilename: 'main.min.css.map'
				},
				files: {
					'main.min.css': 'src/less/theme.less'
				}
			}
		},
		// concat files to one big file
		concat: {
			scripts: {
				src: [
                    'src/js/common/efg.resourceFactory/efg.resourceFactory.js',
                    'src/js/common/efg.owncloudFactory/efg.owncloudFactory.js',
                    'src/js/**/*.js',
                    '<%= ngtemplates.efg.dest %>',
                    '!*.spec.js'
                ],
				dest: 'tmp/main.js'
			},
            vendorscripts: {
                src: [
                    'node_modules/moment/min/moment.min.js',
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/fullcalendar/dist/fullcalendar.min.js',
                    'node_modules/fullcalendar/dist/gcal.min.js',
                    'node_modules/marked/marked.min.js',
                    'node_modules/js-yaml/dist/js-yaml.min.js',
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-route/angular-route.min.js',
                    'node_modules/angular-i18n/angular-locale_de-de.js',
                    'node_modules/angular-simple-logger/dist/angular-simple-logger.light.min.js',
                    'node_modules/ngmap/build/scripts/ng-map.min.js',
                    'node_modules/angularjs-geolocation/dist/angularjs-geolocation.min.js',
                    'node_modules/angular-sanitize/angular-sanitize.min.js',
                    'node_modules/angular-ui-calendar/src/calendar.js',
                    'node_modules/angular-marked/dist/angular-marked.min.js',
                    'node_modules/angulartics/dist/angulartics.min.js',
                    'node_modules/angulartics-piwik/dist/angulartics-piwik.min.js'
                ],
                dest: 'vendor.min.js'
            },
            vendorstyles: {
                src: [
                    'node_modules/fullcalendar/dist/fullcalendar.css'
                ],
                dest: 'vendor.min.css'
            }
		},
        copy: {
            glyphicons: {
                files: [
                    {expand: true, cwd: 'node_modules/bootstrap/dist/fonts', src: ['**'], dest: 'assets/fonts/'}
                ]
            }
        },
		// add angular dependency strings before functions
		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			scripts: {
				files: {
					'<%= concat.scripts.dest %>': ['<%= concat.scripts.dest %>']
				}
			}
		},
		// compile .tpl.html templates to $templateCache
		ngtemplates: {
			efg: {
				src: 'src/js/**/*.tpl.html',
				dest: 'tmp/templates.js',
				options: {
					url: function(url) {
						return url.substring(url.lastIndexOf('/') + 1);
					},
					htmlmin: {
						collapseWhitespace: true,
						collapseBooleanAttributes: true,
						removeAttributeQuotes: false,
						removeComments: true
					}
				}
			}
		},
		// uglify/minify files
		uglify: {
			scripts: {
				options: {
					sourceMap: true,
					sourceMapFilename: 'main.min.js.map'
				},
				files: {
					'main.min.js': ['<%= concat.scripts.dest %>']
				}
			}
		},
		// static livereload file server serving . on localhost:8000
		connect: {
			server: {
				options: {
					livereload: true
				}
			}
		},
        // generate images
        responsive_images: {
            xs: {
                options: {
                    sizes: [{rename: false, width: 768}]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img',
                    src: ['*.{gif,jpg,jpeg,png}'],
                    dest: 'assets/img/xs'
                }]
            },
            xs2x: {
                options: {
                    sizes: [
                        {rename: false, width: 1536},
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img',
                    src: ['*.{gif,jpg,jpeg,png}'],
                    dest: 'assets/img/xs/2x'
                }]
            },
            sm: {
                options: {
                    sizes: [{rename: false, width: 992}]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img',
                    src: ['*.{gif,jpg,jpeg,png}'],
                    dest: 'assets/img/sm'
                }]
            },
            sm2x: {
                options: {
                    sizes: [{rename: false, width: 1984}]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img',
                    src: ['*.{gif,jpg,jpeg,png}'],
                    dest: 'assets/img/sm/2x'
                }]
            },
            md: {
                options: {
                    sizes: [{rename: false, width: 1200}]
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,jpeg,png}'],
                    cwd: 'assets/img',
                    dest: 'assets/img/md'
                }]
            },
            md2x: {
                options: {
                    sizes: [{rename: false, width: 1200 * 2}]
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,jpeg,png}'],
                    cwd: 'assets/img',
                    dest: 'assets/img/md/2x'
                }]
            },
            lg: {
                options: {
                    sizes: [{rename: false, width: 1980}]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img',
                    src: ['*.{gif,jpg,jpeg,png}'],
                    dest: 'assets/img/lg'
                }]
            },
            lg2x: {
                options: {
                    sizes: [{rename: false, width: 1980 * 2}]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/img',
                    src: ['*.{gif,jpg,jpeg,png}'],
                    dest: 'assets/img/lg/2x'
                }]
            }
        },
		// watch for file changes, perform tasks
		watch: {
			scripts: {
				files: '<%= concat.scripts.src %>',
				tasks: ['scripts']
			},
			styles: {
				files: '**/*.less',
				tasks: ['less']
			},
            images: {
                files: 'assets/img/*.{jpg,jpeg,gif,png}',
                tasks: ['assets']
            },
			templates: {
				files: 'src/**/*.tpl.html',
				tasks: ['scripts']
			},
			livereload: {
				files: ['<%= watch.scripts.files %>', '<%= watch.styles.files %>', '**/*.html', '**/*.yml'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.registerTask('default', ['clean', 'styles', 'scripts', 'assets']);

    grunt.registerTask('assets', ['responsive_images']);
	grunt.registerTask('styles', ['less', 'copy:glyphicons']);
	grunt.registerTask('scripts', ['ngtemplates:efg', 'concat', 'ngAnnotate:scripts', 'uglify:scripts']);

	grunt.registerTask('start', ['default', 'connect', 'watch']);
};
