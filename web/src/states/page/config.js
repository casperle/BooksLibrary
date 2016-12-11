import { registerConfig } from 'common/register';

import template from './component.html';

registerConfig([
	'$stateProvider', '$locationProvider', '$urlRouterProvider',
	($stateProvider, $locationProvider, $urlRouterProvider) => {
		$locationProvider.html5Mode(true);

		$urlRouterProvider.otherwise(($injector) => {
			$injector.get('$state').transitionTo('books-home-view');
		});

		$stateProvider
			.state('page', {
				abstract: true,
				url: '^/',
				views: {
					'': {
						template,
					},
				},
			});
	},
]);
