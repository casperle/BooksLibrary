import { registerDirective } from './register';

/**
 * Creates a fileModel attribute, which can be apply on
 * file type inputs, and after change, sets the choosed
 * file into fileModel
 */
registerDirective('fileModel', [ '$parse', function ($parse) {
	return {
		restrict: 'A',
		link (scope, element, attrs) {
			const modelSetter = $parse(attrs.fileModel).assign;

			element.bind('change', () => {
				modelSetter(scope, element[0].files[0]);
				scope.$apply();
			});
		},
	};
} ]);
