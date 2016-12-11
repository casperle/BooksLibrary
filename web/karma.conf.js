
module.exports = function (config) {
	config.set({
		basePath: '.',
		port: 9876,
		logLevel: config.LOG_INFO,

		frameworks: [ 'browserify', 'jasmine' ],
		reporters: [ 'mocha' ],
		browsers: [ 'PhantomJS' ],

		files: [
			'node_modules/core-js/client/core.min.js',
			'dist/vendor/bowerPackages.js',
			'dist/vendor/npmPackages.js',
			'dist/app.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'src/**/*spec.js',
		],
		exclude: [],
		preprocessors: {
			'src/**/*spec.js': [ 'browserify' ],
		},

		colors: true,
		autoWatch: true,
		singleRun: false,
		concurrency: Infinity,

		browserify: {
			debug: true,
			extensions: [ '.js' ],
			transform: [ 'babelify' ],
			plugin: [ 'stringify' ],
			paths: [ './node_modules', './src/' ],
		},
	});
};
