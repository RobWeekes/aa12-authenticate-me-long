// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, User, SpotImage, sequelize } = require('../../db/models');
const { QueryInterface, Sequelize } = require('sequelize');

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





module.exports = router;
