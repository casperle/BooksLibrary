import { registerRun } from 'common/register';

registerRun([ '$rootScope', '$state', ($rootScope, $state) => {
	$rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
		$state.previous = { state: fromState, params: fromParams };
	});
} ]);
