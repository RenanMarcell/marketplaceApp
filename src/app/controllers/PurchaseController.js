const Ad = require('../models/Ad');
const PurchaseIntention = require('../models/PurchaseIntention');
const User = require('../models/User');
const Queue = require('../services/Queue');
const PurchaseMail = require('../jobs/PurchaseMail');

class PurchaseController {
	async show(req, res) {
		const { purchaseId } = req.params;
		const purchaseIntention = await PurchaseIntention.findById(purchaseId).populate('user ad');

		return res.json({ purchaseIntention });

	}
	async store(req, res) {
		const { ad, content } = req.body;

		const purchaseAd = await Ad.findById(ad).populate('author');
		const user = await User.findById(req.userId);

		Queue.create(PurchaseMail.key, {
			ad: purchaseAd,
			user,
			content
		}).save();

		const purchaseIntention = await PurchaseIntention.create({ ad: purchaseAd, user });
		return res.json(purchaseIntention);
	}
}

module.exports = new PurchaseController();