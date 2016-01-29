module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					outputStyle: 'expanded',
					indentType: 'tab',
					indentWidth: 1,
				},
				files: [
					{
						expand: true,
						cwd: 'src/scss',
						src: ['**/*.scss'],
						dest: 'dist',
						ext: '.css',
					},
				],
			},
		},
		autoprefixer: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'dist',
						src: ['**/*.css'],
						dest: 'dist',
						ext: '.css',
					},
				],
			},
		},
		watch: {
			css: {
				files: 'src/scss/**/*.scss',
				tasks: ['sass', 'autoprefixer'],
			},
			options: {
				livereload: true,
			},
		},
	});

	// Node dependencies
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');

	// Run all tasks and keep watching when invoking grunt without args
	grunt.registerTask('default', ['sass', 'autoprefixer', 'watch']);
};
