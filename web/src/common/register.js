import { ModuleName, AnnotationsType } from './enums';

/**
 * Returns main module
 *
 * @return {Module} Main angular module
 */
function getModule () {
	return angular.module(ModuleName);
}

/**
 * Register a component with injections
 *
 * @param  {String} name            Component name
 * @param  {Object} controllerClass Constructor of component controller
 * @param  {Object} options         Other options
 */
export function registerComponent (name, controllerClass, options = {}) {
	const injections = controllerClass.prototype[AnnotationsType.INJECT];

	if (injections && injections.length) {
		controllerClass.$inject = injections;
	}

	options.controller = controllerClass;

	getModule().component(name, options);
}

/**
 * Register a service with injections
 *
 * @param  {String} name         Service name
 * @param  {Object} serviceClass Constructor of service controller
 */
export function registerService (name, serviceClass) {
	const injections = serviceClass.prototype[AnnotationsType.INJECT];
	let deps = serviceClass;

	if (injections && injections.length) {
		deps = [ ...injections, serviceClass ];
	}

	getModule().service(name, deps);
}

/**
 * Register a directive
 *
 * @param  {String} name
 * @param  {Array}  directive
 */
export function registerDirective (name, directive) {
	getModule().directive(name, directive);
}

/**
 * Register a config
 *
 * @param  {Array} config Configuration array of dependencies
 */
export function registerConfig (config) {
	getModule().config(config);
}

/**
 * Register a run
 *
 * @param  {Array} run Configuration array of dependencies
 */
export function registerRun (run) {
	getModule().run(run);
}
