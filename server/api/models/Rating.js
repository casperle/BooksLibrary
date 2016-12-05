/**
 * Rating.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'ratings',
	attributes: {
		book: {
			model: 'book',
		},
		value: {
			type: 'int',
			required: true,
			enum: [ 1, 2, 3, 4, 5 ],
		},
	},
};

