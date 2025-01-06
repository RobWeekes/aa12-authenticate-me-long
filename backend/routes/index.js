// create an Express router, create a test route, and export the router at the bottom of the file
// backend/routes/index.js
const express = require('express');
const router = express.Router();
// Import this file into the routes/index.js file
// and connect it to the router there.
const apiRouter = require('./api');

const { restoreUser } = require('../utils/auth.js');

router.use(restoreUser);
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

// to allow any developer to re-set the CSRF token cookie XSRF-TOKEN.
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  // console.log("XSRF-TOKEN", csrfToken);
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

router.use('/api', apiRouter);

// GET /api/restore-user
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
