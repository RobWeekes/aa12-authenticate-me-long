// import the following packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production'; 
// import the routes in backend/app.js
const routes = require('./routes');

// Initialize the Express application
const app = express();
// global middleware for logging information
app.use(morgan('dev'));
// Add the cookie-parser middleware for parsing cookies 
// and the express.json middleware for parsing JSON bodies 
app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });

  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });

// REVIEWS
// List of all reviews in the database
app.get('/reviews', (req, res, next) => {
  res.send('This route would return all of the reviews.');
});

// One review by id
app.get('/reviews/:reviewId', (req, res, next) => {
  res.send('This route would return the review with the specified id.');
});

// Add review
app.post('/reviews', (req, res, next) => {
  res.send('This route would add a new review.');
})

// Update review
app.put('/reviews/:reviewsId', (req, res, next) => {
  res.send('This route would update an existing review with the specified id.');
})

// Delete review
app.delete('/reviews/:reviewId', (req, res, next) => {
  res.send('This route would delete the review with the specified id.');
})

// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
  res.json({
      message: "API server is running"
  });
});
// 

// at the bottom export app
module.exports = app;