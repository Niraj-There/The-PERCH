const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MONGO_URL = "mongodb://127.0.0.1:27017/THEPERCH";
const flash = require('connect-flash');

const listings = require('./Routes/listing.js'); 
const reviews = require('./Routes/reviews.js');

// Setup middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

// Session configuration
const sessionOptions = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevents client-side JS from accessing cookies
        secure: false // Set to true in production with HTTPS
    }
};

app.use(session(sessionOptions));
app.use(flash());

// Make flash messages available to all templates
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Connect to MongoDB
async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });

// Routes
app.use('/listings', listings);
app.use('/listings/:id/reviews', reviews);

// Home Route
app.get('/', (req, res) => {
    res.send('Hi, I am a server');
});



// Error handling
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    console.error("ERROR:", err);
    res.status(statusCode).render("listings/error", { err });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});