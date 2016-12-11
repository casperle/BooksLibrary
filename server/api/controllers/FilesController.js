/**
 * FilesController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const path = require('path');
const fs = require('fs');

module.exports = {
	upload (req, res) {
		if (req.method === 'GET') {
			return res.json({ 'status': 'GET not allowed' });
		}
		const uploadFile = req.file('file');
		const filePath = path.normalize(`${__dirname}/../../../web/dist/images/`);

		uploadFile.upload({
			dirname: filePath,
		}, (err, files) => {
			if (err) {
				return res.serverError(err);
			}

			files[0].name = files[0].fd.substr(filePath.length);

			res.json({ status: 200, file: files[0] });
		});
	},
	delete (req, res) {
		const filePath = path.normalize(`${__dirname}/../../../web/dist/${req.body.imagePath}`);

		fs.exists(filePath, (exists) => {
			if (exists) {
				fs.unlink(filePath);
			}

			res.json({ status: 200 });
		});
	},
};

