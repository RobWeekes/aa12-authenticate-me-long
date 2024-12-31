const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage } = require('../../db/models');

const router = express.Router();
// added restoreUser middleware
// const { requireAuth } = require('../../utils/auth');
// 

// review paths start with '/reviews'(handled by router in index.js)
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const { spotId, userId, reviewId } = req.body;

  // Check if the user already has a review for this spot
  const existingReview = await Review.findOne({
    where: {
      spotId,
      userId,
    },
  });

  if (existingReview) {
    return res.status(500).json({
      message: "User already has a review for this spot",
    });
  }

  // If reviewId is provided, check if the number of images for this review exceeds the limit
  if (reviewId) {
    // Check if the reviewId exists in the Review table
    const review = await Review.findOne({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found",
      });
    }

    // Check if the number of images for this review exceeds the limit
    const reviewImages = await ReviewImage.findAll({
      where: {
        reviewId,
      },
    });

    if (reviewImages.length >= 10) {
      return res.status(403).json({
        message: "Maximum number of images for this resource was reached",
      });
    }
  }
});

// check if spot exists before creating a review
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  // Check if spot exists first
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    });
  }

  // Create review only if spot exists
  const { review, stars } = req.body;
  const newReview = await Review.create({
    userId: req.user.id,
    spotId: spot.id, // Use the found spot's id
    review,
    stars
  });

  return res.status(201).json(newReview);
});

// Get current user's reviews
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
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });
  res.json({ Reviews: reviews });
});

// Add image to a review
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  if (review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

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

// Edit a review
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

// Delete a review
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