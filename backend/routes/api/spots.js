// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, User } = require('../../db/models');
const { QueryInterface } = require('sequelize');

const router = express.Router();

// spot paths start with '/spots' (handled by router in index.js)

// Get all Spots
router.get('/',
    async (req, res) => {
    const allSpots = await Spot.findAll()

    const countSpots = await Spot.count();
    // console.log('countSpots:', countSpots);
    // use these tricks later \/
    const sumStars = await Review.sum('stars');
    // console.log('sumStars:', sumStars);
    const avgStars = sumStars/countSpots;
    // console.log('avgStars:', avgStars);
    allSpots.avgRating = avgStars;
    allSpots.previewImage = "<image url>"
    // console.log(allSpots);
    return res.status(200).json(allSpots);
})

// Get all Spots owned by the Current User
router.get('/current', requireAuth,
  async (req, res) => {
      const allSpots = await Spot.findAll({
          where: {
              ownerId: req.user.id
          }
      });

      return res.json({ allSpots });  // if else not needed bcuz Get user not logged in returns { user: null }
    //   if(allSpots) return res.json({ allSpots });
    //   else return res.json({ user: null });
  });



module.exports = router;
