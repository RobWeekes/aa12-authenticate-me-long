// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, User, SpotImages, sequelize } = require('../../db/models');
const { QueryInterface, Sequelize } = require('sequelize');

const router = express.Router();

// Booking paths start with '/bookings' (handled by router in index.js)

router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        attributes: ['id', 'spotId'],
        where: { userId: req.user.id },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: SpotImages,
                attributes: ['previewImage']
            },
            {
                attributes: ['userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
            },
        ],
        order: [['id', 'ASC']]
    });
    return res.json({ Bookings: bookings });
});


// 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'



module.exports = router;
