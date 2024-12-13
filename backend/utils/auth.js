// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// backend/utils/auth.js
// Sends a JWT Cookie
// This function will be used in the login and signup routes later.
const setTokenCookie = (res, user) => {
    // Create the token. (Q: why don't we need to use await?)
    const safeUser = {  
      id: user.id,   // Do NOT add the hashedPassword to the payload
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(   // sign(create) a JWT
      { data: safeUser },     // payload object
      secret,                 // secret token
      { expiresIn: parseInt(expiresIn) } // options object: 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie on the response
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });

    return token;
  };  // This function will be used in the login and signup routes later.


  // backend/utils/auth.js  - Certain authenticated routes will require the identity of the current session user
  // middleware to restore the session user based on the contents of the JWT cookie
const restoreUser = (req, res, next) => {  // GLOBAL middleware
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;
        req.user = await User.findByPk(id, {
          attributes: {
            include: ['email', 'createdAt', 'updatedAt']
          }
        });
      } catch (e) {
        res.clearCookie('token');
        return next();
      }

      if (!req.user) res.clearCookie('token');

      return next();
    });
  };


// If there is no current user, return an error
// not global - applies to some endpoints
// use this middleware for requests requiring log in, like create, delete etc.
const requireAuth = function (req, _res, next) {
    if (req.user) return next();  // if user is authenticated, request will proceed to next endpoint
    // if user is not logged in, pass an error to the error handling middlewares
    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
  }

  module.exports = { setTokenCookie, restoreUser, requireAuth };
  
