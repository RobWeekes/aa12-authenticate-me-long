// All the API routes will be served at URL's starting with /api/
const router = require('express').Router();


// test this setup by creating the following test route in the api router
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});


// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});


module.exports = router;
