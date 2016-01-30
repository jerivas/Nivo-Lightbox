module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*\n'+
			'* <%= pkg.screenName %> v<%= pkg.version %>\n' +
			'* <%= pkg.description %>\n' +
			'* <%= pkg.homepage %>\n' +
			'*\n' +
			'* Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author %>\n' +
			'* Free to use and abuse under the MIT license.\n' +
			'* http://www.opensource.org/licenses/mit-license.php\n' +
			'*/\n',
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
						src: ['**/*.css', '!**/*.min.css'],
						dest: 'dist',
						ext: '.css',
					},
				],
			},
		},
		uglify: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src',
						src: ['**/*.js', '!**/*.min.js'],
						dest: 'dist',
						ext: '.min.js',
					},
				],
			},
		},
		cssmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'dist',
						src: ['**/*.css', '!**/*.min.css'],
						dest: 'dist',
						ext: '.min.css',
					},
				],
			},
		},
		usebanner: {
			dist: {
				options: {
					banner: '<%= banner %>',
				},
				files: {
					src: ['dist/**/*.min.css', 'dist/**/*.min.js'],
				},
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
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-banner');

	grunt.registerTask('build', ['uglify', 'cssmin', 'usebanner']);
	grunt.registerTask('all', ['sass', 'autoprefixer', 'uglify', 'cssmin', 'usebanner'])

	// By default run all development tasks and keep watching
	grunt.registerTask('default', ['sass', 'autoprefixer', 'watch']);
};
