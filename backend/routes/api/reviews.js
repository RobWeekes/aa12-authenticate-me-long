const express = require('express');
// const bcrypt = require('bcryptjs');
// const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateReview, validateBooking } = require('../../utils/post-validators');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage, SpotImage, sequelize } = require('../../db/models');
// const { QueryInterface, Sequelize } = require('sequelize');
// const { sequelize } = require('sequelize');

const router = express.Router();

// Review paths start with '/reviews' (handled by router in index.js)

// Get Reviews of Current User
router.get('/current', requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        include: [{
          model: SpotImage,
          as: 'SpotImages',
          where: { preview: true },
          attributes: ['url'],
          required: false
        }]
      },
      {
        model: ReviewImage,
        as: 'ReviewImages',
        attributes: ['id', 'url']
      }
    ]
  });
  const formattedReviews = reviews.map(review => {
    const reviewData = review.toJSON();
    reviewData.Spot.price = Number(reviewData.Spot.price);
    reviewData.Spot.previewImage = reviewData.Spot.SpotImages?.[0]?.url || null;
    delete reviewData.Spot.SpotImages;  // remove "SpotImages": [{url}] from response
    return reviewData;
  });
  return res.json({ Reviews: formattedReviews });
});

// Get all Reviews by a Spot's id - route is in spots.js

// Create a Review for a Spot based on the Spot's id - route is in spots.js

// Create an Image for a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }
  if (review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  // check if the number of images for this review exceeds the limit
  const imageCount = await ReviewImage.count({
    where: { reviewId: req.params.reviewId }
  });
  if (imageCount >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached"
    });
  }
  const { url } = req.body;
  const newImage = await ReviewImage.create({
    reviewId: parseInt(req.params.reviewId),
    url
  });
  res.status(201).json({
    id: newImage.id,
    url: newImage.url
  });
});

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }
  if (review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  const updatedReview = await review.update(req.body);
  res.json(updatedReview);
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }
  if (review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }
  await review.destroy();
  res.json({ message: "Successfully deleted" });
});



module.exports = router;
