const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require('../schema.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');

// Validate review middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Reviews: Post Route
router.post('/', validateReview, wrapAsync(async (req, res) => {
    console.log(req.params.id)
    let listing = await Listing.findById(req.params.id);
    if (!listing) throw new ExpressError(404, "Listing not found");
    
    const newReview = new Review(req.body.review);
    newReview.listing = listing._id;  // Set the listing reference
    await newReview.save();

    // Ensure reviews array exists
    if (!listing.reviews) listing.reviews = [];
    listing.reviews.push(newReview._id);
    await listing.save();
    req.flash('success', 'Successfully added a new review!');

    res.redirect(`/listings/${listing._id}`);
}));

// Delete Review Route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    
    // Remove review reference from the listing
    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });
    
    // Delete the review itself
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted the review!');
    
    res.redirect(`/listings/${id}`);
}));

module.exports = router;