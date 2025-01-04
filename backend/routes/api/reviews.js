const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage } = require('../../db/models');
// const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { QueryInterface, Sequelize } = require('sequelize');

const router = express.Router();

// Validation for creating a review
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];



// Get all Reviews of the Current User
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
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', [Sequelize.literal('(SELECT url FROM SpotImages WHERE SpotImages.spotId = Spot.id AND preview = true LIMIT 1)'), 'previewImage']
      ]
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

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  if (review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // Check if the number of images for this review exceeds the limit
  const imageCount = await ReviewImage.count({
    where: { reviewId: req.params.reviewId }
  });

  if (imageCount >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this review was reached"
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