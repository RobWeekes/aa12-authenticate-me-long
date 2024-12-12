// All the API routes will be served at URL's starting with /api/
const router = require('express').Router();


// test this setup by creating the following test route in the api router
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});





module.exports = router;