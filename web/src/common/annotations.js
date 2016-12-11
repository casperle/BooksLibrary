import { AnnotationsType } from './enums';

/**
 * Creates a helper property of injections on target
 *
 * @param {...String} deps Needed injections
 */
export function Inject (...deps) {
	return (target) => {
		target.prototype[AnnotationsType.INJECT] = [ ...deps ];
	};
}
