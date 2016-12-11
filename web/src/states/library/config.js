import { registerConfig } from 'common/register';

import template from './component.html';

registerConfig([ '$stateProvider', ($stateProvider) => {
	$stateProvider
		.state('books-library-view', {
			parent: 'page',
			url: '^/library',
			views: {
				'': {
					template,
				},
			},
		});
} ]);
