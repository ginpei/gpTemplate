module.exports = function(grunt) {
	grunt.initConfig({
		lint: {
			all: ['grunt.js', 'gptemplate.js']
		},
		min: {
			all: {
				src: ['gptemplate.js'],
				dest: 'gptemplate.min.js'
			}
		},
		watch: {
			files: ['grunt.js', 'gptemplate.js'],
			tasks: 'lint min'
		}
	});

  grunt.registerTask('default', 'lint min watch');
};
