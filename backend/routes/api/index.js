// All the API routes will be served at URL's starting with /api/
const router = require('express').Router();

// backend/routes/api/index.js
// Import the restoreUser middleware & connect it to the router before any other middleware or route handlers are connected to the router.
const { restoreUser } = require("../../utils/auth.js");
// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
// declaring new router variables here \/
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const reviewImagesRouter = require('./review-images.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spot-images.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
// using new routers here \/
// connect these routers to the main API router
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/bookings', bookingsRouter);
router.use('/spot-images', spotImagesRouter);



/////////////////////////////////////////////////
//// CODE FOR TESTING USER AUTH ROUTES BELOW ////


// // TESTING THE CSRF FUNCTION
// // comment this test route in:

// // POST /api/test
// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

// // To test the custom csrfFetch function that attaches the CSRF token to the header, navigate to root of app, http://localhost:5173
// // In the browser console, make a (FETCH) request to POST /api/test with the demo user credentials using the window.csrfFetch function:

// /*
// csrfFetch('/api/test', {
//   method: 'POST',
//   body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
// }).then(res => res.json()).then(data => console.log(data));
// */

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



// NOTE - this POST /api/test route referenced in phase 0 was done above in the backend project ^

// removed the POST /api/test test route below for phase 0 of frontend readme
// // note: the readme didn't instruct to paste the following code. added below for phase 0 of frontend readme
// router.post('/test', (req, res) => {
//     // note: added this because there wasn't an object with a key of requestBody logged in the terminal with the value as the object that was passed into the body of the request. added below for phase 0 of frontend readme
//     console.log('requestBody:', req.body);
//     //
//     const { credential, password } = req.body;
//     // note: changed this because there wasn't an object with a key of requestBody logged in the terminal with the value as the object that was passed into the body of the request. added below for phase 0 of frontend readme
//     // res.json({ credential, password });
//     res.json({ message: "Test endpoint successful",
//         receivedData: { credential, password } });
//         //
// });
// //

module.exports = router;
