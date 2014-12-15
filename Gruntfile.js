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
					cleancss: true,
					sourceMap: true,
					sourceMapFilename: 'theme.min.css.map'
				},
				files: {
					'theme.min.css': 'src/less/theme.less'
				}
			}
		},
		// concat files to one big file
		concat: {
			scripts: {
				src: ['src/js/**/*.js', '<%= ngtemplates.efg.dest %>', '!*.spec.js'],
				dest: 'tmp/main.js'
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
						removeAttributeQuotes: true,
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
				tasks: ['styles']
			},
			templates: {
				files: 'src/**/*.tpl.html',
				tasks: ['scripts']
			},
			livereload: {
				files: ['<%= watch.scripts.files %>', '<%= watch.styles.files %>', '**/*.html'],
				options: {
					livereload: true
				}
			}
		}
	});
	
	grunt.registerTask('default', ['clean', 'styles', 'scripts']);
	
	grunt.registerTask('styles', ['less:styles']);
	grunt.registerTask('scripts', ['ngtemplates:efg', 'concat:scripts', 'ngAnnotate:scripts', 'uglify:scripts']);
	
	grunt.registerTask('start', ['default', 'connect', 'watch']);
};