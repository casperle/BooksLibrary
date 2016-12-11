import { Inject } from 'common/annotations';
import { registerComponent } from 'common/register';

import template from './component.html';

const options = {
	template,
	bindings: {
		bookId: '<',
	},
};

const starIcons = {
	filled: '<i class="glyphicon glyphicon-star"></i> ',
	empty: '<i class="glyphicon glyphicon-star-empty"></i> ',
};

@Inject('BooksService', '$scope', '$state', '$alert')
class BookFormComponent {
	constructor (BooksService, $scope, $state, $alert) {
		Object.assign(this, {
			BooksService,
			$scope,
			$state,
			$alert,
		});

		/**
		 * Options for rating selectbox
		 * @type {Array}
		 */
		this.ratingSelectOptions = [];
		this._setRatingSelectOptions();

		/**
		 * Book object
		 * @type {Object}
		 */
		this.book = {
			rating: 1,
		};
		if (this.bookId) {
			this._loadBook();
		}
	}

	/**
	 * Saves a book - desides to call update or create methods based on book id
	 *
	 * @public
	 */
	async saveBook () {
		if (this.bookForm.$invalid) {
			return;
		}

		if (this.book.id) {
			await this.BooksService.update(this.book);
		}
		else {
			await this.BooksService.create(this.book);
		}

		await this.$alert({
			title: 'Success!',
			content: 'Book succesfully saved.',
			type: 'success',
			placement: 'top',
			animation: 'am-fade-and-scale',
			container: 'body',
			duration: '4',
		}).$promise;

		this.$state.transitionTo('books-library-view');
	}

	/**
	 * Loads the book by id
	 *
	 * @private
	 */
	async _loadBook () {
		this.book = await this.BooksService.load(this.bookId);

		delete this.book.createdAt;
		delete this.book.updatedAt;

		this.$scope.$apply();
	}

	/**
	 * Creates options for rating selectbox
	 *
	 * @private
	 */
	_setRatingSelectOptions () {
		for (let i = 1; i <= 5; i++) {
			let starsHelper = '';

			for (let n = 1; n <= 5; n++) {
				starsHelper += n <= i ? starIcons.filled : starIcons.empty;
			}

			this.ratingSelectOptions.push({
				value: i,
				label: starsHelper,
			});
		}
	}
}

registerComponent('bookForm', BookFormComponent, options);
