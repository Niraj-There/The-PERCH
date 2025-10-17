// Load environment variables FIRST (before any other requires)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

// Import Routes
console.log('Loading listing routes...');
const listingRouter = require('./Routes/listing.js');
console.log('Loading review routes...');
const reviewRouter = require('./Routes/reviews.js');
console.log('Loading user routes...');
const userRouter = require('./Routes/user.js');
console.log('All routes loaded successfully');

// Atlas DB URL 
const dbUrl = process.env.ATLAS_DB_URL;

if (!dbUrl) {
    console.error('ERROR: ATLAS_DB_URL not found in environment variables!');
    process.exit(1);
}

// Connect to MongoDB Atlas
async function main() {
    await mongoose.connect(dbUrl);
}
main()
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.log(err);
    });

// Setup view engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

// Create MongoDB session store
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60, // time period in seconds
    crypto: {
        secret: process.env.SECRET 
    }
});

store.on('error', function(e) {
    console.log('SESSION STORE ERROR Mongo session', e);
});

// Session configuration
const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Local variables middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

// Routes
app.use('/', userRouter);
app.use('/listings', listingRouter);

// Review routes (Express 5 compatible - direct route definition)
const ReviewController = require('./Controllers/reviews.js');
const { validateReview, isLoggedIn: reviewLogin, isReviewAuthor } = require('./Routes/middleware.js');
const wrapAsync = require('./utils/wrapAsync.js');

app.post('/listings/:id/reviews', reviewLogin, validateReview, wrapAsync(ReviewController.createReview));
app.delete('/listings/:id/reviews/:reviewId', reviewLogin, isReviewAuthor, wrapAsync(ReviewController.destroyReview));

// Home Route
app.get('/', (req, res) => {
    res.redirect('/listings');
});

// 404 handler
app.all('*', (req, res, next) => {
    next(new ExpressError("Page Not Found!", 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render('listings/error.ejs', { err: { message, statusCode } });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});