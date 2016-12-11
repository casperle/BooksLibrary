import { registerConfig } from 'common/register';

registerConfig([ '$stateProvider', ($stateProvider) => {
	$stateProvider
		.state('books-add-view', {
			parent: 'page',
			url: '^/add',
			views: {
				'': {
					template: '<book-form></book-form>',
				},
			},
		});
} ]);
