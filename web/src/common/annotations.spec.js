import { Inject } from './annotations';
import { AnnotationsType } from './enums';

describe('Annotations - Method Inject()', () => {
	it('should push injections into [AnnotationsType.INJECT] property in class as an array', () => {
		@Inject('inject1', 'inject2')
		class MyDiretive {}

		const result = MyDiretive.prototype[AnnotationsType.INJECT];

		expect(result).toEqual([ 'inject1', 'inject2' ]);
	});
});
