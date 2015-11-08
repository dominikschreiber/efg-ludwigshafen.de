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
				src: ['src/js/common/efg.resourceFactory/efg.resourceFactory.js', 'src/js/**/*.js', '<%= ngtemplates.efg.dest %>', '!*.spec.js'],
				dest: 'tmp/main.js'
			},
            vendorscripts: {
                src: [
                    'node_modules/js-yaml/dist/js-yaml.min.js',
                    'bower_components/lodash/lodash.min.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/moment/min/moment.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-i18n/angular-locale_de-de.js',
                    'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
                    'bower_components/angularjs-geolocation/dist/angularjs-geolocation.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-ui-calendar/src/calendar.js',
                    'bower_components/angular-markdown-directive/markdown.js',
                    'bower_components/fullcalendar/dist/fullcalendar.min.js',
                    'bower_components/fullcalendar/dist/gcal.js',
                    'bower_components/showdown/compressed/Showdown.min.js'
                ],
                dest: 'vendor.min.js'
            },
            vendorstyles: {
                src: [
                    'bower_components/fullcalendar/dist/fullcalendar.css'
                ],
                dest: 'vendor.min.css'
            }
		},
        copy: {
            glyphicons: {
                files: [
                    {expand: true, cwd: 'bower_components/bootstrap/dist/fonts', src: ['**'], dest: 'assets/fonts/'}
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

	grunt.registerTask('default', ['clean', 'styles', 'scripts']);

	grunt.registerTask('styles', ['less', 'copy:glyphicons']);
	grunt.registerTask('scripts', ['ngtemplates:efg', 'concat', 'ngAnnotate:scripts', 'uglify:scripts']);

	grunt.registerTask('start', ['default', 'connect', 'watch']);
};