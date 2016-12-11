import { registerConfig } from 'common/register';
import { BooksListType } from 'common/enums';

import template from './component.html';

registerConfig([ '$stateProvider', ($stateProvider) => {
	$stateProvider
		.state('books-home-view', {
			parent: 'page',
			url: '^/home',
			views: {
				'': {
					template,
					controller () {
						this.listTypes = BooksListType;
					},
					controllerAs: '$ctrl',
				},
			},
		});
} ]);
