import { Inject } from 'common/annotations';
import { registerService } from 'common/register';

import { BooksListType } from 'common/enums';

const BaseUrl = 'book';
const BaseImagePath = '/images/';

@Inject('HttpService', '$alert')
class BooksService {

	constructor (HttpService, $alert) {
		this.HttpService = HttpService;
		this.alert = $alert({
			title: 'Request failed!',
			content: 'Please try again.',
			placement: 'top',
			type: 'danger',
			show: false,
			container: 'body',
			animation: 'am-fade-and-slide-top',
		});
	}

	/**
	 * Loads a book
	 *
	 * @param {Number} listType Type of needed list
	 *
	 * @public
	 * @return {Promise}
	 */
	load (bookId) {
		return this.HttpService
			.get(BaseUrl, { id: bookId })
			.then((response) => response.data)
			.catch(() => this._showAlert);
	}

	/**
	 * Loads a list of books by listTypes
	 *
	 * @param {String} listType Type of needed list
	 *
	 * @public
	 * @return {Promise}
	 */
	loadList (listType) {
		let params = {
			sort: 'updatedAt DESC',
		};

		if (listType === BooksListType.TOP10) {
			params = {
				limit: 10,
				sort: 'rating DESC',
			};
		}
		else if (listType === BooksListType.LATEST10) {
			params = {
				limit: 10,
				sort: 'createdAt DESC',
			};
		}
		return this.HttpService
			.get(BaseUrl, params)
			.then((response) => response.data)
			.catch(() => this._showAlert);
	}

	/**
	 * Delete a book
	 *
	 * @param {Number} bookId
	 *
	 * @public
	 * @return {Promise}
	 */
	delete (bookId) {
		return this.HttpService
			.delete(BaseUrl, { id: bookId })
			.then((response) => response.file)
			.catch(() => this._showAlert);
	}

	/**
	 * Creates a book
	 *
	 * @param {Object} book
	 *
	 * @public
	 * @return {Promise}
	 */
	async create (book) {
		if (book.image && book.image instanceof File) {
			const fileData = await this._uploadImage(book.image);

			book.imagePath = BaseImagePath + fileData.name;
			delete book.image;
		}

		return this.HttpService
			.post(`${BaseUrl}/create`, book)
			.then((response) => response.data)
			.catch(() => this._showAlert);
	}

	/**
	 * Updates a book
	 *
	 * @param {Object} book
	 *
	 * @public
	 * @return {Promise}
	 */
	async update (book) {
		if (book.image && book.image instanceof File) {
			const fileData = await this._uploadImage(book.image);

			if (book.imagePath) {
				this._deleteImage(book.imagePath);
			}

			book.imagePath = BaseImagePath + fileData.name;
			delete book.image;
		}

		return this.HttpService
			.post(`${BaseUrl}/update/${book.id}`, book)
			.then((response) => response.data)
			.catch(() => this._showAlert);
	}

	/**
	 * Uploads an image
	 * - returns a promise with uploaded file
	 *
	 * @param {Object} image File type object of image
	 *
	 * @private
	 * @return {Promise}
	 */
	_uploadImage (image) {
		const fd = new FormData();

		fd.append('file', image);

		return this.HttpService
			.post('files/upload', fd, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined,
				},
			})
			.then((response) => response.data.file)
			.catch(() => this._showAlert);
	}

	/**
	 * Delete an image
	 *
	 * @param {String} imagePath
	 *
	 * @private
	 * @return {Promise}
	 */
	_deleteImage (imagePath) {
		return this.HttpService
			.delete('files/delete', { imagePath })
			.catch(() => this._showAlert);
	}

	/**
	 * Shows alert
	 *
	 * @private
	 */
	async _showAlert () {
		await this.alert.$promise;
		this.alert.show();
	}

}

registerService('BooksService', BooksService);

