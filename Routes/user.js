const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('./middleware.js');
const UserController = require('../Controllers/users.js');

// Signup Routes
router
    .route('/signup')
    .get(UserController.renderSignupForm)
    .post(wrapAsync(UserController.signup));

// Login Routes
router
    .route('/login')
    .get(UserController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/login',
        }), 
        UserController.login
    );

// Logout Route
router.get('/logout', UserController.logout);

module.exports = router;