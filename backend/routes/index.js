// create an Express router, create a test route, and export the router at the bottom of the file
// backend/routes/index.js
const express = require('express');
const router = express.Router();
// Import this file into the routes/index.js file
// and connect it to the router there.
const apiRouter = require('./api');

// removed below for phase 1 of frontend deploy readme
// const { restoreUser } = require('../utils/auth.js');

// router.use(restoreUser);
// // router.get('/hello/world', function(req, res) {
// //   res.cookie('XSRF-TOKEN', req.csrfToken());
// //   res.send('Hello World!');
// // });

// In development: allow any developer to re-set the CSRF token cookie XSRF-TOKEN.
// if (process.env.NODE_ENV !== 'production') {
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  // console.log("XSRF-TOKEN", csrfToken);
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});
// }

// Phase 1: API Routes
// All the URLs of the routes in the api router will be prefixed with /api
router.use('/api', apiRouter);

// added below for phase 0 of frontend readme
// ... after `router.use('/api', apiRouter);`

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    // changed below for phase 1 of frontend deploy readme
    // return res.sendFile(
      res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder at all other routes NOT starting with /api
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  // Since we can access the API endpoint at /api/spots/1 but not /spots/1, we'll verify the static route handler in backend/routes/index.js is being reached. Add a log in your catch-all route to track when it's being hit:
  router.get(/^(?!\/?api).*/, (req, res) => {
    console.log('Catching non-API route:', req.path);
    res.cookie('XSRF-TOKEN', req.csrfToken());
    // changed below for phase 1 of frontend deploy readme
    // return res.sendFile(
      res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// In development, you need another way to get the XSRF-TOKEN cookie on your frontend app
// because the React frontend is on a different server than the Express backend \/

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    // changed below for phase 1 of frontend deploy readme
    // res.cookie('XSRF-TOKEN', req.csrfToken());
    // return res.json({});
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    return res.status(200).json({
      'XSRF-Token': csrfToken
    // added below for phase 1 of frontend deploy readme
    });
  });
}

// removed below for phase 1 of frontend deploy readme
// // GET /api/restore-user
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
//

module.exports = router;
