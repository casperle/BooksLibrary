import { registerRun } from 'common/register';

registerRun([ '$rootScope', '$state', ($rootScope, $state) => {
	/*
	 * prevent reload of state's controller if state.reload === false & state has defined unique event
	 * ie in our case - prevent reload when manipulating with tables
	 * @emits stateReloadPreventedEvent
	 */
	/*$rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
		if (fromState.name === toState.name && toState.reload === false) {
			assert(toState.stateReloadPreventedEvent);

			if (!isEqual(toParams, fromParams)) {
				$rootScope.$broadcast(toState.stateReloadPreventedEvent);
			}

			$state.transitionTo(toState, toParams, { reload: false, notify: false });

			return event.preventDefault();
		}
	});*/

	$rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
		$state.previous = { state: fromState, params: fromParams };
	});
} ]);
