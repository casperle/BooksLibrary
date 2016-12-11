import { ModuleName, ServerUrl } from './enums';

const module = angular.mock.module;

describe('HttpService', () => {
	let $httpBackendMock = null;
	let HttpServiceMock = null;

	beforeEach(() => {
		module(ModuleName);

		inject(($httpBackend, $injector) => {
			$httpBackendMock = $httpBackend;
			HttpServiceMock = $injector.get('HttpService');
		});
	});

	it('should make a get request to server', () => {
		const url = 'getTest';
		const params = { param: 'param' };
		const config = {
			headers: {
				'Accept': 'noname header',
				'custom': 'custom',
			},
		};

		$httpBackendMock
			.expect('GET', `${ServerUrl}${url}?param=param`, null, config.headers)
			.respond(200);

		HttpServiceMock.get(url, params, config);

		expect($httpBackendMock.flush).not.toThrow();
	});

	it('should make a post request to server', () => {
		const url = 'postTest';
		const data = { param: 'param' };
		const config = {
			headers: {
				'Accept': 'noname accept',
				'Content-Type': 'noname Content-Type',
				'custom': 'custom',
			},
		};

		$httpBackendMock
			.expect('POST', `${ServerUrl}${url}`, data, config.headers)
			.respond(200);

		HttpServiceMock.post(url, data, config);

		expect($httpBackendMock.flush).not.toThrow();
	});

	it('should make a delete request to server', () => {
		const url = 'getTest';
		const data = { param: 'param' };
		const config = {
			headers: {
				'Accept': 'noname header',
				'Content-Type': 'noname Content-Type',
				'custom': 'custom',
			},
		};

		$httpBackendMock
			.expect('DELETE', `${ServerUrl}${url}`, data, config.headers)
			.respond(200);

		HttpServiceMock.delete(url, data, config);

		expect($httpBackendMock.flush).not.toThrow();
	});
});
