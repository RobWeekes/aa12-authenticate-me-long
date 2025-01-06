// backend/routes/api/review-images.js
const express = require('express');
const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Review-image paths start with '/review-images' (handled by router in index.js)

// Delete a Review Image
router.delete('/:reviewImageId', requireAuth, async (req, res) => {
  const reviewImageId = req.params.reviewImageId;
  
  const reviewImage = await ReviewImage.findByPk(reviewImageId, {
    include: [{
      model: Review,
      attributes: ['userId']
    }]
  });
  if (!reviewImage) {
    return res.status(404).json({ message: "Review Image couldn't be found" });
  };
  if (reviewImage.Review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  };  // if user has access:
  await reviewImage.destroy();
  return res.json({ message: "Successfully deleted" });
});



module.exports = router;
