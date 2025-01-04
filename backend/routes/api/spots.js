// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, sequelize } = require('../../db/models');
const { QueryInterface, Sequelize } = require('sequelize');

const router = express.Router();

const validateNewSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    // range req. -90 < 90
    .withMessage('Latitude must be within -90 and 90'),
  check('lng')
    .exists({ checkFalsy: true })
    // range req. -180 < 180
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    // range req. < 0
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

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

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const reviewsBySpotId = await Spot.findByPk(req.params.spotId);

  if (!reviewsBySpotId) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    });
  }

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        as: 'ReviewImages',
        attributes: ['id', 'url']
      }
    ]
  });

  return res.json({ Reviews: reviews });
});

// Get details of a Spot from a Spot id
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
            as: 'Owner', // alias name
            attributes: ['id', 'firstName', 'lastName']
          },
        ],
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('SpotReviews.spotId')), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('SpotReviews.stars')), 'avgStarRating']
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
router.get('/', async (req, res) => {
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

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if(!spot) {  // Couldn't find a Spot with the specified id
    return res.status(404).json({
      message: "Spot couldn't be found"
    });
  } // Spot must belong to the current user
  if(spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden"
    });
  }
  // Successful Response
  const newSpotImage = await SpotImage.create({
    spotId: req.params.spotId,
    url: req.body.url,
    preview: req.body.preview,

  })
  return res.status(201).json({
    id: newSpotImage.id,
    url: newSpotImage.url,
    preview: newSpotImage.preview
  });
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const spotId = parseInt(req.params.spotId);
  const { review, stars } = req.body;
  const userId = req.user.id;

  // Check if the spot exists
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const existingReview = await Review.findOne({
    where: { 
      spotId: spotId,
      userId: userId 
    }
  });

  if (existingReview) {
    return res.status(403).json({ 
      message: "User already has a review for this spot"
    });
  }

  // Create the new review
  const newReview = await Review.create({
    userId,
    spotId,
    review,
    stars
  });

  return res.status(201).json(newReview);
});

// Create a Spot
router.post('/', requireAuth, validateNewSpot, async (req, res) => {
  const newSpot = await Spot.create({
      "ownerId": req.user.id,
      "address": req.body.address,
      "city": req.body.city,
      "state": req.body.state,
      "country": req.body.country,
      "lat": req.body.lat,
      "lng": req.body.lng,
      "name": req.body.name,
      "description": req.body.description,
      "price": req.body.price
  });
  // console.log(newSpot);
  return res.status(201).json(newSpot);
})

module.exports = router;
