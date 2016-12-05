/**
 * Books.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName: 'books',
	attributes: {
		id: {
			type: 'integer',
			autoIncrement: true,
			unique: true,
			primaryKey: true,
		},
		title: {
			type: 'string',
		},
		desc: {
			type: 'string',
		},
		author: {
			type: 'string',
		},
		ratings: {
			collection: 'rating',
			via: 'book',
		},
		read: {
			type: 'boolean',
			defaultsTo: false,
		},
		comments: {
			collection: 'comment',
			via: 'book',
		},
		imagePath: {
			type: 'string',
		},
		shopUrl: {
			type: 'string',
			url: true,
		},
		releaseDate: {
			type: 'date',
		},
	},

};

