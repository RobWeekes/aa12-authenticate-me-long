// create an Express router, create a test route, and export the router at the bottom of the file
// backend/routes/index.js
const express = require('express');
const router = express.Router();

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

module.exports = router;