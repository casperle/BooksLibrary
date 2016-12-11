import fs from 'fs';
import path from 'path';

import gulp from 'gulp';
import gutil from 'gulp-util';
import webserver from 'gulp-webserver';
import eslint from 'gulp-eslint';
import less from 'gulp-less';
import concat from 'gulp-concat';
import filter from 'gulp-filter';

import runSequence from 'run-sequence';
import bowerFiles from 'main-bower-files';

import karma from 'karma';
import browserify from 'browserify';
import babelify from 'babelify';
import babelHelpers from 'babelify-external-helpers';
import stringify from 'stringify';
import source from 'vinyl-source-stream';

const paths = {
	appFile: './src/app.js',
	lessFile: './src/index.less',
	indexFile: './src/index.html',
	karmaConfFile: `${__dirname}/karma.conf.js`,

	packageJson: './package.json',

	devJSLint: [ './src/**/*.js', '!./src/**/*.html' ],
	devJSWatch: [ './src/**/*.js', './src/**/*.html', '!./src/index.html' ],
	devLESS: './src/**/*.less',
	testFilesPattern: './src/**/*.spec.js',
	bootstrapFonts: './bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}',

	distFolder: './dist/',
	distVendorFolder: './dist/vendor/',
	distFontsFolder: './dist/fonts/',
	bowerFolder: './bower_components/',

	appDistFileName: 'app.js',
	npmDistFileName: 'npmPackages.js',
	bowerDistFileName: 'bowerPackages.js',
	bowerDistCssFileName: 'bowerPackages.css',
};

const npmPackages = Object.keys(JSON.parse(fs.readFileSync(paths.packageJson, 'utf8')).dependencies);
const babelOptions = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));

function vendorBundler () {
	const bundler = browserify()
		.transform(stringify({
			appliesTo: { includeExtensions: [ '.html' ] },
		}));

	return npmPackages
		.reduce((_bundler, dep) => _bundler.require(dep), bundler);
}

function appBundler () {
	const bundler = browserify({
		paths: [ './node_modules', './src/' ],
	})
		.transform(stringify({
			appliesTo: { includeExtensions: [ '.html' ] },
		}))
		.plugin(babelHelpers)
		.transform(babelify.configure(
			Object.assign({}, babelOptions, {
				plugins: babelOptions.plugins.concat('external-helpers-2'),
			})
		))
		.require(require.resolve(paths.appFile), { entry: true });

	return npmPackages
		.reduce((_bundler, dep) => _bundler.external(dep), bundler);
}

function watch (filesPath, ...taskNames) {
	gulp.watch([ filesPath, `!${paths.testFilesPattern}` ], (event) => {
		const watchFile = event.path.substr(path.normalize(`${__dirname}/`).length);

		gutil.log(`File ${event.type}: ${gutil.colors.yellow(watchFile)}`);

		runSequence(...taskNames, (error) => {
			if (error) {
				return;
			}
		});
	});
}


gulp.task('set:index', () => {
	return gulp.src(paths.indexFile)
		.pipe(gulp.dest(paths.distFolder));
});

gulp.task('copy:bower:js', () => {
	return gulp.src(bowerFiles())
		.pipe(filter('**/*.js'))
		.pipe(concat(paths.bowerDistFileName))
		.pipe(gulp.dest(paths.distVendorFolder));
});

gulp.task('copy:bower:less', () => {
	return gulp.src(bowerFiles())
		.pipe(filter('**/*.less'))
		.pipe(concat(paths.bowerDistCssFileName))
		.pipe(less())
		.pipe(gulp.dest(paths.distVendorFolder));
});

gulp.task('copy:bootstrap:fonts', () => {
	return gulp.src(paths.bootstrapFonts)
		.pipe(gulp.dest(paths.distFontsFolder));
});

gulp.task('lint:app', () => {
	return gulp.src(paths.devJSLint)
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('set:app', () => {
	return appBundler()
		.bundle()
		.on('error', function (err) {
			gutil.log(`${gutil.colors.red('[set:app] ERROR')}: ${gutil.colors.yellow(err.message)}`);
			this.emit('end');
		})
		.pipe(source(paths.appDistFileName))
		.pipe(gulp.dest(paths.distFolder));
});

gulp.task('set:npm', () => {
	return vendorBundler()
		.bundle()
		.pipe(source(paths.npmDistFileName))
		.pipe(gulp.dest(paths.distVendorFolder));
});

gulp.task('set:less', () => {
	return gulp.src(paths.lessFile)
		.pipe(less())
		.on('error', function (err) {
			gutil.log(`${gutil.colors.red('[set:less] ERROR')}: ${gutil.colors.yellow(err.message)}`);
			this.emit('end');
		})
		.pipe(gulp.dest(paths.distFolder));
});

gulp.task('start:server', () => {
	return gulp.src(paths.distFolder)
		.pipe(webserver({
			open: 'http://localhost:8000/',
			fallback: 'index.html',
		}));
});

gulp.task('start:tests', () => {
	return new karma.Server({
		configFile: paths.karmaConfFile,
		action: 'watch',
	}).start();
});

gulp.task('default', (done) => {
	runSequence(
		'lint:app',
		[ 'set:index', 'copy:bootstrap:fonts', 'copy:bower:js', 'copy:bower:less', 'set:npm', 'set:app', 'set:less' ],
		[ 'start:server', 'start:tests' ],
		done
	);

	watch(paths.devJSWatch, 'lint:app', 'set:app');
	watch(paths.devLESS, 'set:less');
});
