// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { validateReview, validateBooking, validateNewSpot, validateQueryParamsForSpots } = require('../../utils/post-validators');
const { QueryInterface, Sequelize } = require('sequelize');
const { Op } = require('sequelize');

const router = express.Router();

// Spot paths start with '/spots' (handled by router in index.js)

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
  return res.json({ "Spots": ownerSpots });
  // get user not logged in returns { user: null }
});

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {  // couldn't find a spot with the specified id
    return res.status(404).json({ message: "Spot couldn't be found" });
  };
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

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const spotBookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
    ]
  });
  if (!spot) {  // couldn't find a spot with the specified id
    return res.status(404).json({ message: "Spot couldn't be found" });
  };
  // successful response: if you ARE NOT the owner of the spot.
  // if (spot.ownerId !== req.user.id) {
  //   return res.json({ Bookings:
  //     {
  //       spotId: spotBookings.spotId,
  //       startDate: spotBookings.startDate,
  //       endDate: spotBookings.endDate,
  //     }
  //   })
  // }
  // successful response: if you ARE the owner of the spot.
  res.json({ Bookings: spotBookings });
})

// Get details of a Spot from a Spot ID
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
        attributes: ['id', 'url', 'preview']
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
  if (!spot) {  // couldn't find a spot with the specified id
    return res.status(404).json({ message: "Spot couldn't be found" });
  };
  return res.json(spot);
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {  // couldn't find a spot with the specified id
    return res.status(404).json({ message: "Spot couldn't be found" });
  };  // check if spot is owned by user
  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  };
  // successful response
  const newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview
  });
  return res.status(201).json({
    id: newSpotImage.id,
    url: newSpotImage.url,
    preview: newSpotImage.preview
  });
});

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
  const spotId = parseInt(req.params.spotId);
  const { startDate, endDate } = req.body;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {  // couldn't find a spot with the specified id
    return res.status(404).json({ message: "Spot couldn't be found" });
  };  // check if spot is owned by user
  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  };
  // successful response
  // const newSpotImage = await SpotImage.create({
  //   spotId,
  //   url,
  //   preview
  // });
  // return res.status(201).json({
  //   id: newSpotImage.id,
  //   url: newSpotImage.url,
  //   preview: newSpotImage.preview
  // });

  // Check for booking conflicts
  const conflictingBooking = await Booking.findOne({
    where: {
      spotId,
      [Op.or]: [
        // new booking starts during existing booking
        {
          startDate: { [Op.lte]: new Date(startDate) },
          endDate: { [Op.gte]: new Date(startDate) }
        },
        // new booking ends during existing booking  
        {
          startDate: { [Op.lte]: new Date(endDate) },
          endDate: { [Op.gte]: new Date(endDate) }
        },
        // new booking surrounds existing booking
        {
          startDate: { [Op.gte]: new Date(startDate) },
          endDate: { [Op.lte]: new Date(endDate) }
        }
      ]
    }
  });

  if (conflictingBooking) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
    });
  }

  // Create booking if no conflicts
  const spotBookings = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate
  });

  res.json(spotBookings);
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const spotId = parseInt(req.params.spotId);
  const { review } = req.body;
  const stars = parseInt(req.body.stars);
  const userId = req.user.id;
  // check if the spot exists
  const spot = await Spot.findByPk(spotId);
  if (!spot) {  // couldn't find a spot with the specified id
    return res.status(404).json({ message: "Spot couldn't be found" });
  };    // check if user already reviewed this spot
  const existingReview = await Review.findOne({
    where: {
      spotId: spotId,
      userId: userId
    }
  });
  if (existingReview) {
    return res.status(500).json({
      message: "User already has a review for this spot"
    });
  };
  // create the new review
  const newReview = await Review.create({
    userId,
    spotId,
    review,
    stars
  });
  return res.status(201).json(newReview);
});

// Edit a Spot
router.put('/:spotId', requireAuth, validateNewSpot, async (req, res) => {
  const spotId = req.params.spotId;
  // check if the spot exists
  const spot = await Spot.findByPk(spotId);
  if (!spot) {  // couldn't find a spot with the specified id
    return res.status(404).json({ message: "Spot couldn't be found" });
  };  // check if spot is owned by user
  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ "message": "Forbidden" });
  };
  // reassign spot attributes with new values
  const updatedSpot = await spot.update(req.body);
  return res.json(updatedSpot);
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  // check if the spot exists
  const spot = await Spot.findByPk(spotId);
  if (!spot) {  // couldn't find a spot with the specified id
    return res.status(404).json({ message: "Spot couldn't be found" });
  };  // check if spot is owned by user
  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ "message": "Forbidden" });
  };
  // delete the spot
  await spot.destroy();
  return res.json({ "message": "Successfully deleted" });
});

// Create a Spot
router.post('/', requireAuth, validateNewSpot, async (req, res) => {
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
  // console.log(newSpot);
  return res.status(201).json(newSpot);
});


// Add Query Filters to Get All Spots
// API endpoint for retrieving filtered spots
router.get('/', validateQueryParamsForSpots, async (req, res) => {
  const { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  const pagination = {  // standard page limit/offset object
    limit: parseInt(size),
    offset: (parseInt(page) - 1) * parseInt(size)
  };

  const where = {};

  if (minLat || maxLat) {   // checks if either a minimum or maximum latitude was provided in the query parameters
    where.lat = {};    // creates an empty object to hold the latitude conditions
    if (minLat) where.lat[Op.gte] = parseFloat(minLat);  // add a "greater than or equal to" condition
    if (maxLat) where.lat[Op.lte] = parseFloat(maxLat);  // Op.gte is Sequelize's operator for ">="
  }    // This creates a flexible 'where' clause that can handle either or both latitude boundaries, which Sequelize then uses to filter the database query results.
  if (minLng || maxLng) {
    where.lng = {};
    if (minLng) where.lng[Op.gte] = parseFloat(minLng);
    if (maxLng) where.lng[Op.lte] = parseFloat(maxLng);
  }
  if (minPrice || maxPrice) {
    where.price = {};             // parseFloat not needed?
    if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
    if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
  }

  const spots = await Spot.findAll({
    where,
    ...pagination,
    include: [
      {
        model: Review,
        as: 'SpotReviews',
        attributes: []
      },
      {
        model: SpotImage,
        as: 'SpotImages',
        attributes: [],
        where: { preview: true },
        required: false
      }
    ],
    attributes: {
      include: [  // got it working with SQL literals
        [sequelize.literal('(SELECT AVG(stars) FROM Reviews WHERE Reviews.spotId = Spot.id)'), 'avgRating'],
        [sequelize.literal('(SELECT url FROM SpotImages WHERE SpotImages.spotId = Spot.id AND preview = true LIMIT 1)'), 'previewImage']
      ] // sequelize.fn/col kept giving { "message": "SQLITE_ERROR: no such column: SpotReviews.stars" } at routes\\api\\spots.js:406:17"
    },
    group: ['Spot.id']
  });

  // if no query params were passed, return [spots] w/o page & size keys
  // console.log('req.query:', req.query)
  if (Object.keys(req.query).length === 0) {
    return res.json({
      Spots: spots,
    });
  };  // if query params were passed, include page & size
  return res.json({
    Spots: spots,
    page: page,
    size: size
  });
});




module.exports = router;
