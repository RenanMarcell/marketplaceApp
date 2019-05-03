const Ad = require('../models/Ad');

class AdController {
	async index(req, res) {
		console.log(req.userId);
		const filters = {};

		if (req.query.price_min || req.query.price_max) {
			filters.price = {}
			filters.price.$gte = req.query.price_min || 0
			filters.price.$lte = req.query.price_max || Infinity;
		}

		if (req.query.title) filters.title = new RegExp(req.query.title, 'i')
		const ads = await Ad.paginate({ ...filters, 'purchasedBy': null }, {
			limit: 20,
			populate: ['author'],
			page: req.query.page || 1,
			sort: '-createdAt'
		});

		return res.json({ ads });
	}
	async show(req, res) {
		const ad = await Ad.findById(req.params.id).populate('author');

		return res.json({ ad });
	}
	async store(req, res) {
		const ad = await Ad.create({ ...req.body, author: req.userId });

		return res.json({ ad });
	}
	async update(req, res) {
		const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
			new: true
		});

		return res.json({ ad });
	}
	async delete(req, res) {
		const ad = await Ad.findByIdAndDelete(req.params.id);

		return res.send();
	}
}

module.exports = new AdController();