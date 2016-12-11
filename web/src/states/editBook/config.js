import { registerConfig } from 'common/register';

registerConfig([ '$stateProvider', ($stateProvider) => {
	$stateProvider
		.state('books-edit-view', {
			parent: 'page',
			url: '^/edit/:bookId',
			views: {
				'': {
					template: '<book-form book-id="$ctrl.bookId"></book-form>',
					controllerAs: '$ctrl',
					controller: [ '$stateParams', function ($stateParams) {
						this.bookId = $stateParams.bookId;
					} ],
				},
			},
		});
} ]);
