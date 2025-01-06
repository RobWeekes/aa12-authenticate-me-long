// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');
const { validateReview, validateBooking, validateNewSpot, validateQueryParameterForSpot } = require('../../utils/post-validators');
const { QueryInterface, Sequelize } = require('sequelize');
const { Op } = require('sequelize');

const router = express.Router();

// const validateNewSpot = [
//   check('address')
//     .exists({ checkFalsy: true })
//     .withMessage('Street address is required'),
//   check('city')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 4 })
//     .withMessage('City is required'),
//   check('state')
//     .exists({ checkFalsy: true })
//     .withMessage('State is required'),
//   check('country')
//     .exists({ checkFalsy: true })
//     .withMessage('Country is required'),
//   check('lat')
//     .exists({ checkFalsy: true })
//     .isDecimal({ min: -90, max: 90 }) // range req. -90 < 90
//     .withMessage('Latitude must be within -90 and 90'),
//   check('lng')
//     .exists({ checkFalsy: true })
//     .isDecimal({ min: -180, max: 180 })// range req. -180 < 180
//     .withMessage('Longitude must be within -180 and 180'),
//   check('name')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 1, max: 50 })
//     .withMessage('Name must be less than 50 characters'),
//   check('description')
//     .exists({ checkFalsy: true })
//     .withMessage('Description is required'),
//   check('price')
//     .exists({ checkFalsy: true })
//     .isDecimal({ min: 0 }) // range req. > 0
//     .withMessage('Price per day must be a positive number'),
//   handleValidationErrors
// ];

// const validateReview = [
//   check('review')
//     .exists({ checkFalsy: true })
//     .withMessage('Review text is required'),
//   check('stars')
//     .isInt({ min: 1, max: 5 })
//     .withMessage('Stars must be an integer from 1 to 5'),
//   handleValidationErrors
// ];

// const validateBooking = [
//   check('startDate')
//   .exists({ checkFalsy: true })
//   .custom((value) => {
//     const startDate = new Date(value);
//     const today = new Date();
//     if (startDate < today) {
//       throw new Error('startDate cannot be in the past');
//     }
//     return true;
//   }),
//   check('endDate')
//   .exists({ checkFalsy: true })
//   .custom((value, { req }) => {
//     const endDate = new Date(value);
//     const startDate = new Date(req.body.startDate);
//     if (endDate <= startDate) {
//       throw new Error('endDate cannot be on or before startDate');
//     }
//     return true;
//   }),
//   handleValidationErrors
// ];

// const validateQueryParameterForSpot = [
//   check('page')
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage('Page must be greater than or equal to 1'),
//   check('size')
//     .optional()
//     .isInt({ min: 1, max: 20 })
//     .withMessage('Size must be between 1 and 20'),
//   check('maxLat')
//     .optional()
//     .isFloat({ max: 90 })
//     .withMessage('Maximum latitude is invalid'),
//   check('minLat')
//     .optional()
//     .isFloat({ min: -90 })
//     .withMessage('Minimum latitude is invalid'),
//   check('minLng')
//     .optional()
//     .isFloat({ max: 180 })
//     .withMessage('Maximum longitude is invalid'),
//   check('maxLng')
//     .optional()
//     .isFloat({ min: -180 })
//     .withMessage('Minimum longitude is invalid'),
//   check('minPrice')
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage('Minimum price must be greater than or equal to 0'),
//   handleValidationErrors
// ];

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

// Get all Spots
router.get('/', async (req, res) => {
  const allSpots = await Spot.findAll()
  return res.status(200).json({ "Spots": allSpots });
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
  const spotId = req.params.spotId;
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
        {
          startDate: {
            [Op.between]: [new Date(startDate), new Date(endDate)]
          }
        },
        {
          endDate: {
            [Op.between]: [new Date(startDate), new Date(endDate)]
          }
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

// Utility function to handle query parameter validation
const validateQueryParams = (query) => {
  const errors = {};
  // Validate page
  if (query.page && (query.page < 1)) {
    errors.page = "Page must be greater than or equal to 1";
  };
  // Validate size
  if (query.size && (query.size < 1 || query.size > 20)) {
    errors.size = "Size must be between 1 and 20";
  };
  // Validate latitude and longitude ranges
  if (query.minLat && query.maxLat && query.minLat > query.maxLat) {
    errors.minLat = "Minimum latitude must be less than or equal to maximum latitude";
  };
  if (query.minLng && query.maxLng && query.minLng > query.maxLng) {
    errors.minLng = "Minimum longitude must be less than or equal to maximum longitude";
  };
  // Validate price range
  if (query.minPrice && query.minPrice < 0) {
    errors.minPrice = "Minimum price must be greater than or equal to 0";
  };
  if (query.maxPrice && query.maxPrice < 0) {
    errors.maxPrice = "Maximum price must be greater than or equal to 0";
  };
  return errors;
};

// API endpoint for retrieving filtered spots
router.get('/', validateQueryParameterForSpot, async (req, res) => {
  const { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice = 0, maxPrice = Infinity } = req.query;
  // Validate query parameters
  const errors = validateQueryParams(req.query);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  };
  // Convert query parameters to numbers
  let pageNum = 1; // Default value
  let pageSize = 20; // Default value
  let minLatValue = null; // Default value
  let maxLatValue = null; // Default value
  let minLngValue = null; // Default value
  let maxLngValue = null; // Default value
  let minPriceValue = 0; // Default value
  let maxPriceValue = Infinity; // Default value
  // Check if 'page' exists, then parse and assign it to pageNum
  if (page) {
    pageNum = parseInt(page, 10);
  };
  // Check if 'size' exists, then parse and assign it to pageSize
  if (size) {
    pageSize = parseInt(size, 10);
  };
  // Check if 'minLat' exists, then parse and assign it to minLatValue
  if (minLat) {
    minLatValue = parseFloat(minLat);
  };
  // Check if 'maxLat' exists, then parse and assign it to maxLatValue
  if (maxLat) {
    maxLatValue = parseFloat(maxLat);
  };
  // Check if 'minLng' exists, then parse and assign it to minLngValue
  if (minLng) {
    minLngValue = parseFloat(minLng);
  };
  // Check if 'maxLng' exists, then parse and assign it to maxLngValue
  if (maxLng) {
    maxLngValue = parseFloat(maxLng);
  };
  // Check if 'minPrice' exists, then parse and assign it to minPriceValue
  if (minPrice) {
    minPriceValue = parseFloat(minPrice);
  };
  // Check if 'maxPrice' exists, then parse and assign it to maxPriceValue
  if (maxPrice) {
    maxPriceValue = parseFloat(maxPrice);
  };
  // Build query filters
  const filters = {};
  if (minLatValue && maxLatValue) {
    filters.lat = { [Sequelize.Op.between]: [minLatValue, maxLatValue] };
  };
  if (minLngValue && maxLngValue) {
    filters.lng = { [Sequelize.Op.between]: [minLngValue, maxLngValue] };
  };
  if (minPriceValue >= 0 && maxPriceValue >= 0) {
    filters.price = { [Sequelize.Op.between]: [minPriceValue, maxPriceValue] };
  };
  try {
    // Query the database with the built filters and pagination
    const spots = await Spot.findAndCountAll({
      where: filters,
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
    });
    // Return paginated results
    const response = {
      Spots: spots.rows,
      page: pageNum,
      size: pageSize,
    };
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  };
});



module.exports = router;
