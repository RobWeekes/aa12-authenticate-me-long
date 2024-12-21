const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// review paths start with '/reviews'(handled by router in index.js)
router.post(
    "/spots/:spotId/reviews",
    async (req, res, next) => {
        const { review, stars } = req.body;
        const newReview = await Review.create({ review, stars });

        const reviewResponse = {
            id: reviews.id, 
            userId: reviews.userId,
            spotId: reviews.spotId, //req.params.spotId ?
            review: reviews.review,
            stars: reviews.stars,
            createdAt: reviews.createdAt,
            updatedAt: reviews.updatedAt
        }

        return res.json({
            reviewResponse
        })
    }
)
















module.exports = router;