// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');
const { QueryInterface, Sequelize } = require('sequelize');

const router = express.Router();

// spot paths start with '/spots' (handled by router in index.js)

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const ownerSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
          {
            model: Review,
            as: 'SpotReviews',  // alias name
            attributes: []
          },
          {
            model: SpotImage,
            as: 'SpotImages',  // alias name
            attributes: [],
            where: { preview: true },
            required: false
          },
        ],
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
            [sequelize.col('SpotImages.url'), 'previewImage']
          ]
        },
        group: ['Spot.id', 'SpotImages.url']
    });

    return res.json({ "Spots": ownerSpots });  // if else not needed bcuz Get user not logged in returns { user: null }
    // if(ownerSpots) return res.json({ ownerSpots });
    // else return res.json({ user: null });
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: [
          {
            model: Review,
            as: 'SpotReviews',  // alias name
            attributes: []
          },
          {
            model: SpotImage,
            as: 'SpotImages',  // alias name
            attributes: ['id','url','preview']
            // where: { preview: true },
            // required: false
          },
          {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
          },
        ],
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('SpotReviews.spotId')), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('SpotReviews.stars')), 'avgStarRating']
            // [sequelize.col('SpotImages.url'), 'SpotImages']
          ]
        },
        group: ['Spot.id', 'SpotImages.id', 'Owner.id']
    });

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
    return res.json(spot);
})

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
  return res.status(200).json({ "Spots": allSpots });
})




module.exports = router;
