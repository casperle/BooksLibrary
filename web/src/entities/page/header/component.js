import { registerComponent } from 'common/register';

import template from './component.html';

const options = {
	template,
};

class PageHeaderComponent {
	constructor () {
		/**
		 * Items in header
		 * @type {Array.<Object>}
		 */
		this.items = [
			{
				text: 'Home',
				href: '/home',
			},
			{
				text: 'Library',
				href: '/library',
			},
			{
				text: 'Add a Book',
				href: '/add',
			},
		];
	}

}

registerComponent('pageHeader', PageHeaderComponent, options);
