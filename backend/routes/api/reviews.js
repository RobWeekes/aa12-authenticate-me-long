const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

// review paths start with '/reviews'(handled by router in index.js)
// Get all reviews of current user
router.get('/me', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: { userId: req.user.id }
    });
    return res.json({ Reviews: reviews });
    // const reviewResponse = {
    //     id: reviews.id,
    //     userId: reviews.userId,
    //     spotId: reviews.spotId, //req.params.spotId ?
    //     review: reviews.review,
    //     stars: reviews.stars,
    //     createdAt: reviews.createdAt,
    //     updatedAt: reviews.updatedAt
    // }
    // res.send('This route would return all of the reviews.');
});

// Get reviews by spot id
router.get(
    "/spots/:spotId/reviews",
    async (req, res) => {
        const reviews = await Review.findAll({
            where: { spotId: req.params.spotId }
        });
        return res.json({ Reviews: reviews });
    });
// const reviewResponse = {
//     id: reviews.id,
//     userId: reviews.userId,
//     spotId: reviews.spotId, //req.params.spotId ?
//     review: reviews.review,
//     stars: reviews.stars,
//     createdAt: reviews.createdAt,
//     updatedAt: reviews.updatedAt
// }
// },

// Create review for spot

router.post(
    "/spots/:spotId/reviews", requireAuth,
    async (req, res) => {
        const { review, stars } = req.body;
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: req.params.spotId,
            review,
            stars
        });
        return res.status(201).json(newReview);
    });

// const reviewResponse = {
//     id: reviews.id,
//     userId: reviews.userId,
//     spotId: reviews.spotId, //req.params.spotId ?
//     review: reviews.review,
//     stars: reviews.stars,
//     createdAt: reviews.createdAt,
//     updatedAt: reviews.updatedAt
// }

// Add image to a review
router.post('/reviews/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const newImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    });
    return res.status(201).json(newImage);
});
// const reviewResponse = {
//     id: reviews.id,
//     url: reviews.url
// }

// Update review
router.put('/reviews/:reviewsId', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const updatedReview = await Review.findByPk(req.params.reviewId);
    await updatedReview.update({ review, stars });
    return res.json(updatedReview);
});
//     const reviewResponse = {
//         id: reviews.id,
//         userId: reviews.userId,
//         spotId: reviews.spotId, //req.params.spotId ?
//         review: reviews.review,
//         stars: reviews.stars,
//         createdAt: reviews.createdAt,
//         updatedAt: reviews.updatedAt
//     }
//     res.send('This route would update an existing review with the specified id.');
// })

// Delete review
router.delete('/reviews/:reviewId', requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    await review.destroy();
    return res.json({ message: "Successfully deleted" });
});
//         message: review.message
//     }
//     res.send('This route would delete the review with the specified id.');
// })

// // One review by id
// router.get('/reviews/:reviewId', async (req, res, next) => {
//     res.send('This route would return the review with the specified id.');
// });

// // Add review
// router.post('/reviews', async (req, res, next) => {
//     res.send('This route would add a new review.');
// })



// return res.json({
//     reviewResponse
// })
// }
// )



module.exports = router;