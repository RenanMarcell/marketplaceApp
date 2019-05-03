const Ad = require('../models/Ad');
const PurchaseIntention = require('../models/PurchaseIntention');

class SellController {
	async update(req, res) {
		const purchaseIntention = await PurchaseIntention.findById(req.params.purchaseId).populate('ad').populate('author');
		const { ad } = purchaseIntention;

		const updatedAd = await Ad.findByIdAndUpdate(ad._id, { ...ad._docs, purchasedBy: req.params.purchaseId }, { new: true });
		return res.json({ updatedAd });
	}
}

module.exports = new SellController();