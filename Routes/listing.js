const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const Listing = require('../models/listing.js');


// Validation middleware
const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }    
};


// Index Route
router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New Route
router.get('/new', (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route (populate reviews)
router.get('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing ID format");
        return res.redirect("/listings");
    }
    const listing = await Listing.findById(id).populate({
        path: 'reviews',
        options: { sort: { createdAt: -1 } }
    });
    if (!listing) {
        req.flash("error", "The listing you are searching for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));

// Create Route
router.post('/', validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash('success', 'Successfully created a new listing!');
    res.redirect("/listings");
}));

// Edit Route
router.get('/:id/edit', wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing ID format");
        return res.redirect("/listings");
    }
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "The listing you are searching for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

// Update Route
router.put('/:id', validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing ID format");
        return res.redirect("/listings");
    }
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (!listing) {
        req.flash("error", "The listing you are searching for does not exist");
        return res.redirect("/listings");
    }
    req.flash('success', 'Successfully updated the listing!');
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the listing!');
    res.redirect('/listings');
}));

module.exports = router;