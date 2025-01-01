// backend/routes/api/spots.js
// copied imports from users.js \/
const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { QueryInterface } = require('sequelize');

const router = express.Router();

// spot paths start with '/spots' (handled by router in index.js)

        // users as template:
        // const { email, password, username, firstName, lastName } = req.body;
        // const hashedPassword = bcrypt.hashSync(password);
        // const user = await User.create({ email, username, hashedPassword, firstName, lastName});

        // const safeUser = {
        //   id: user.id,
        //   firstName: user.firstName,
        //   lastName: user.lastName,
        //   email: user.email,
        //   username: user.username,
        // };






// Get all Spots
// need to reference reviews table
router.get('/',
    async (req, res) => {
    const allSpots = await Spot.findAll()

    const countSpots = await Spot.count();
    console.log('countSpots:', countSpots);
    // not sure about these maths \/
    // const sumStars = await Review.sum('stars');
    // console.log('sumStars:', sumStars);
    // const avgStars = sumStars/countSpots;
    // console.log('avgStars:', avgStars);
    allSpots.avgRating = 'avgStars';
    allSpots.previewImage = "<image url>"
    console.log(allSpots);
    return res.status(200).json(allSpots);
})




module.exports = router;
