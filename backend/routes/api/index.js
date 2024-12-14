// All the API routes will be served at URL's starting with /api/
const router = require('express').Router();

// backend/routes/api/index.js
// Import the restoreUser middleware & connect it to the router before any other middleware or route handlers are connected to the router.

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});




/////////////////////////////////////////////////
//// CODE FOR TESTING USER AUTH ROUTES BELOW //// 

// // Test this setup by creating the following test route in the api router
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });


// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });


// // GET /api/restore-user
// // test the restoreUser middleware and check whether or not the req.user key has been populated by the middleware properly.
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// });


// // Lastly, test your requireAuth middleware
// // If there is no session user, the route will return an 
// // error. Otherwise it will return the session user's information.

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get('/require-auth', requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

//// CODE FOR TESTING USER AUTH ROUTES ABOVE //// 
/////////////////////////////////////////////////


module.exports = router;
