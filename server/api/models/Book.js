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
		rating: {
			type: 'integer',
			enum: [ 1, 2, 3, 4, 5 ],
		},
		read: {
			type: 'boolean',
			defaultsTo: false,
		},
		comments: {
			type: 'string',
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

