
module.exports = function (config) {
	config.set({
		basePath: '.',
		port: 9876,
		logLevel: config.LOG_INFO,

		frameworks: [ 'browserify', 'jasmine' ],
		reporters: [ 'mocha' ],
		browsers: [ 'PhantomJS' ],

		files: [ 'src/**/*spec.js' ],
		exclude: [],
		preprocessors: {
			'src/**/*spec.js': [ 'browserify' ],
		},

		colors: true,
		autoWatch: true,
		singleRun: false,
		concurrency: Infinity,

		browserify: {
			debug: false,
			extensions: [ '.js' ],
			transform: [ 'babelify' ],
			plugin: [ 'stringify' ],
		},
	});
};
