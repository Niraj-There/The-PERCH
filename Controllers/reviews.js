const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings');
    }
    
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    newReview.listing = listing._id;
    
    await newReview.save();
    
    if (!listing.reviews) listing.reviews = [];
    listing.reviews.push(newReview._id);
    await listing.save();
    
    req.flash('success', 'Review added successfully!');
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });
    
    await Review.findByIdAndDelete(reviewId);
    
    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
};
