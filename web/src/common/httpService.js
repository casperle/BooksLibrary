import { Inject } from './annotations';
import { registerService } from './register';

import { ServerUrl } from './enums';

@Inject('$http')
class HttpService {

	constructor ($http) {
		this.$http = $http;
	}

	/**
	 * Wrapper for get request
	 *
	 * @param  {String} url    Specified url
	 * @param  {Object} params Data which will be parsed and send
	 * @param  {Object} config Other configurations for $http
	 *
	 * @public
	 * @return {Promise}
	 */
	get (url, params = {}, config = {}) {
		return this.$http(Object.assign({}, config, {
			method: 'get',
			url: `${ServerUrl}${url}`,
			params,
		}));
	}

	/**
	 * Wrapper for post request
	 *
	 * @param  {String} url    Specified url
	 * @param  {Object} data   Data which will be send as a body
	 * @param  {Object} config Other configurations for $http
	 *
	 * @public
	 * @return {Promise}
	 */
	post (url, data = {}, config = {}) {
		return this.$http(Object.assign({}, config, {
			method: 'post',
			url: `${ServerUrl}${url}`,
			data,
		}));
	}


	/**
	 * Wrapper for delete request
	 *
	 * @param  {String} url    Specified url
	 * @param  {Object} data   Data which will be send as a body
	 * @param  {Object} config Other configurations for $http
	 *
	 * @public
	 * @return {Promise}
	 */
	delete (url, data = {}, config = {}) {
		return this.$http(Object.assign({}, config, {
			method: 'delete',
			url: `${ServerUrl}${url}`,
			data,
		}));
	}
}

registerService('HttpService', HttpService);
