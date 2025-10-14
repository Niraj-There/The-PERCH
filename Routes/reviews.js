const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('./middleware.js');
const ReviewController = require('../Controllers/reviews.js');

// Create and Delete Review Routes
router.post('/', isLoggedIn, validateReview, wrapAsync(ReviewController.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(ReviewController.destroyReview));

module.exports = router;