// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { validateBooking, validateReview } = require('../../utils/post-validators');

const { Booking, Spot, User, SpotImage, sequelize } = require('../../db/models');
const { Sequelize, Op } = require('sequelize');

const router = express.Router();

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
        price: Number(plainBooking.Spot.price),
        previewImage: plainBooking.Spot.SpotImages?.[0]?.url || null
      },  // previewImage is set using optional chaining (?.) to safely access the URL from SpotImages
      userId: plainBooking.userId,
      startDate: plainBooking.startDate,
      endDate: plainBooking.endDate,
      createdAt: plainBooking.createdAt,
      updatedAt: plainBooking.updatedAt
    };
  });  // remove 'SpotImages' from 'Spot' attribute
  formattedBookings.map(booking => {
    const bookingData = booking;
    bookingData.Spot.price = Number(bookingData.Spot.price);
    bookingData.Spot.previewImage = bookingData.Spot.SpotImages?.[0]?.url || null;
    delete bookingData.Spot.SpotImages;
    return bookingData;
  });
  return res.json({ Bookings: formattedBookings });
});

// Get all Bookings for a Spot based on the Spot's id - in spots.js route

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
  const currentDate = new Date();
  if (booking.startDate < currentDate) {
    return res.status(403).json({ message: "Past bookings can't be modified" });
  }
  // check for booking conflicts
  const existingBooking = await Booking.findOne({
    where: {
      endDate: startDate,
      id: { [Op.ne]: parseInt(bookingId)} // Exclude current booking
    }
  });

  if (existingBooking) {
    return res.status(403).json({
      message: "Start date conflicts with an existing booking"
    });
  }

  const conflictingBooking = await Booking.findOne({
    where: {
      id: { [Op.ne]: parseInt(bookingId) },
      spotId: booking.spotId,
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
        },
        {
          // new booking start date on existing start date
          startDate: {
            [Op.lte]: new Date(endDate),
            [Op.gte]: new Date(startDate)
          }
        },
        {
          // new booking end date on end start date
          endDate: {
            [Op.lte]: new Date(endDate),
            [Op.gte]: new Date(startDate)
          }
        },
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
