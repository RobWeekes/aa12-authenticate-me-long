// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { validateBooking, validateReview } = require('../../utils/post-validators');

const { Booking, Spot, User, SpotImage, sequelize } = require('../../db/models');
const { QueryInterface, Sequelize, Op } = require('sequelize');

const router = express.Router();

// const validateBooking = [
//   check('startDate')
//     .exists({ checkFalsy: true })
//     .custom((value) => {
//         const startDate = new Date(value);
//         const today = new Date();
//         if (startDate < today) {
//           throw new Error('startDate cannot be in the past');
//         }
//         return true;
//   }),
//   check('endDate')
//     .exists({ checkFalsy: true })
//     .custom((value, { req }) => {
//         const endDate = new Date(value);
//         const startDate = new Date(req.body.startDate);
//         if (endDate <= startDate) {
//           throw new Error('endDate cannot be on or before startDate');
//         }
//         return true;
//   }),
//   handleValidationErrors
// ];

// Booking paths start with '/bookings' (handled by router in index.js)

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    // attributes: ['id', 'spotId'],
    where: { userId: req.user.id },
    include: [
        {
            model: Spot,
            attributes: [
                'id', 'ownerId', 'address', 'city', 'state',
                'country', 'lat', 'lng', 'name', 'price',
            ],
            include: [
              {
                model: SpotImage,
                as: 'SpotImages',
                attributes: ['url'],
                where: { preview: true },
                required: false
              }
            ]
        }
    ],
    attributes: [
      'id', 'spotId', 'userId', 'startDate',
      'endDate', 'createdAt', 'updatedAt'
    ]
  });   // takes each booking from the array and transforms it
  const formattedBookings = bookings.map(booking => {
    // converts the Sequelize model instance into a plain JavaScript object \/
    const plainBooking = booking.get({ plain: true });
    return {  // creates a new object w attributes in specific order:
      id: plainBooking.id,
      spotId: plainBooking.spotId,
      Spot: {
        ...plainBooking.Spot,   // spreads in all Spot properties
        previewImage: plainBooking.Spot.SpotImages?.[0]?.url || "No preview image available"
      },  // previewImage is set using optional chaining (?.) to safely access the URL from SpotImages
      userId: plainBooking.userId,
      startDate: plainBooking.startDate,
      endDate: plainBooking.endDate,
      createdAt: plainBooking.createdAt,
      updatedAt: plainBooking.updatedAt
    };
  });  // remove 'SpotImages' from 'Spot' attribute
  formattedBookings.forEach(booking => {
    delete booking.Spot.SpotImages;
  });
  console.log('formattedBookings:', formattedBookings);
  return res.json({ Bookings: formattedBookings });
});

// Edit a Booking
router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {
  const bookingId = req.params.bookingId;
  const { startDate, endDate } = req.body;
  // check if the booking exists
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {  // couldn't find a booking with the specified id
    return res.status(404).json({ message: "Booking couldn't be found" });
  };  // check if booking is owned by user
  if (booking.userId !== req.user.id) {
    return res.status(403).json({ "message": "Forbidden" });
  };
  // check if booking is in the past
  if (new Date(booking.endDate) < new Date()) {
    return res.status(403).json({ message: "Past bookings can't be modified" });
  }
  // check for booking conflicts
  const conflictingBooking = await Booking.findOne({
    where: {
      id: { [Op.ne]: parseInt(bookingId) },
      spotId: booking.spotId,
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

  const updatedBooking = await booking.update({
    startDate,
    endDate
  });
  return res.json(updatedBooking);
});


// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;
  // check if the booking exists
  const booking = await Booking.findOne({
    where: { id: bookingId },
    include: [{
      model: Spot
    }]
  });
  if (!booking) {  // couldn't find a booking with the specified id
    return res.status(404).json({ message: "Booking couldn't be found" });
  };
  // check if booking has started
  if (new Date(booking.startDate) <= new Date()) {
    return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
  }
  // check if booking or spot is owned by user
  if (booking.Spot.ownerId !== req.user.id && booking.userId !== req.user.id) {
    return res.status(403).json({ "message": "Forbidden" });
  };
  // delete the booking
  await booking.destroy();
  return res.json({ "message": "Successfully deleted" });
});




module.exports = router;
