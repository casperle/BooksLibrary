import { ModuleName } from 'common/enums';

const module = angular.mock.module;

describe('Component: bookForm', () => {
	let $scope = null;
	let $compile = null;
	let BooksServiceMock = null;
	let $qMock = null;

	beforeEach(() => {
		module(ModuleName, ($provide) => {
			$provide.service('BooksService', () => {
				return {
					load: jasmine.createSpy(),
				};
			});
		});

		inject(($injector) => {
			$scope = $injector.get('$rootScope').$new();
			$compile = $injector.get('$compile');
			BooksServiceMock = $injector.get('BooksService');
			$qMock = $injector.get('$q');
		});
	});

	it('should show empty form', () => {
		const element = $compile('<book-form></book-form>')($scope);

		$scope.$digest();

		const titleInput = $(element).find('input#title').first();
		const authorInput = $(element).find('input#author').first();

		expect(titleInput.val()).toBe('');
		expect(authorInput.val()).toBe('');
	});

	// failing test, because of async/await
	// the test stacs within the _loadBook's call
	it('should show filled form', () => {
		const loadBookDefered = $qMock.defer();

		BooksServiceMock.load.and.returnValue(loadBookDefered.promise);

		const element = $compile('<book-form book-id="1"></book-form>')($scope);

		$scope.$digest();

		loadBookDefered.resolve({
			book: {
				title: 'title',
				author: 'author',
			},
		});

		$scope.$apply();

		const titleInput = $(element).find('input#title').first();
		const authorInput = $(element).find('input#author').first();

		expect(titleInput.val()).toBe('title');
		expect(authorInput.val()).toBe('author');
	});
});
