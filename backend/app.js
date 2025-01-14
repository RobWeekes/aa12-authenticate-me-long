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
    console.error(err);
    const error = {
      message: err.message,
      errors: err.errors
    };
    // Only include stack traces in development
  if (process.env.NODE_ENV !== 'production') {
    error.stack = err.stack;
  } // pass along error code or 500 by default
  res.status(err.status || 500).json(error);
  });

// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
  res.json({
      message: "API server is running"
  });
});
//

// at the bottom export app
module.exports = app;
