import moment from 'moment';
import autobind from 'autobind-decorator';

import { Inject } from 'common/annotations';
import { registerComponent } from 'common/register';

import { BooksListType } from 'common/enums';

import template from './component.html';
import modalTemplate from 'entities/books/modal/component.html';
import popoverTemplate from 'entities/books/popover/component.html';

const options = {
	template,
	bindings: {
		listType: '<',
		libraryPage: '<',
	},
};

@Inject('BooksService', '$scope', '$modal', '$popover')
class BooksGridViewComponent {
	constructor (BooksService, $scope, $modal, $popover) {
		Object.assign(this, {
			BooksService,
			$scope,
			$modal,
			$popover,
		});

		/**
		 * Specify what type of books list has to be loaded
		 * @type {Object.<Array>}
		 */
		this._listType = this.listType || BooksListType.LIST;

		/**
		 * Options for rating selectbox
		 * @type {Array}
		 */
		this.ratingSelectOptions = [];
		this._setRatingSelectOptions();

		/**
		 * Loaded books
		 * @type {Object.<Array>}
		 */
		this.books = null;
		this._setBooks();
	}

	/**
	 * Opens a preview of book in a modal window
	 * - adds a human friendly release date
	 *
	 * @param {Object} book
	 *
	 * @public
	 */
	openModal (book) {
		const $modalScope = this.$scope.$new(true);

		$modalScope.book = book;
		$modalScope.book.niceDate = moment(book.releaseDate).format('MMM DD, YYYY');

		this.$modal({
			title: book.title,
			scope: $modalScope,
			template: modalTemplate,
		});
	}

	/**
	 * Opens a popover to verify the deletion
	 *
	 * @param {Object} event  Mouse click event
	 * @param {Object} bookId Book id
	 * @param {Object} index  Index of book in collection
	 *
	 * @public
	 */
	async openPopover (event, book, index) {
		const $popoverScope = this.$scope.$new(true);

		Object.assign($popoverScope, {
			deleteBook: this.deleteBook,
			book,
			index,
		});

		const popover = this.$popover($(event.target), {
			trigger: 'manual',
			title: 'Are you sure?',
			template: popoverTemplate,
			html: true,
			animation: 'am-flip-x',
			autoClose: true,
			placement: 'auto right',
			scope: $popoverScope,
		});

		await popover.$promise;
		popover.show();
	}

	/**
	 * Delete a book from DB and from collection
	 *
	 * @param {Number} bookId
	 * @param {Number} index  Index of book position in collection
	 *
	 * @public
	 */
	@autobind
	async deleteBook (book, index) {
		await this.BooksService.delete(book);

		this.books.splice(index, 1);
		this.$scope.$apply();
	}

	/**
	 * Creates options for rating selectbox
	 *
	 * @private
	 */
	_setRatingSelectOptions () {
		this.ratingSelectOptions.push({ value: '', label: 'All' });

		for (let i = 1; i <= 5; i++) {
			this.ratingSelectOptions.push({ value: i, label: i });
		}
	}

	/**
	 * Load books by listType, sets the collection and updates scope
	 *
	 * @private
	 */
	async _setBooks () {
		const books = await this.BooksService.loadList(this._listType);

		books.forEach((book) => {
			book.stars = [];

			for (let i = 1; i <= 5; i++) {
				book.stars.push({
					full: Boolean(book.rating >= i),
				});
			}
		});

		this.books = books;
		this.$scope.$apply();
	}
}

registerComponent('booksGridView', BooksGridViewComponent, options);
