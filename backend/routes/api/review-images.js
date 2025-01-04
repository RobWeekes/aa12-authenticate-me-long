// backend/routes/api/review-images.js
const express = require('express');
const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  
  const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
    include: [{ 
      model: Review,
      attributes: ['userId'] 
    }]
  });

  console.log('Found review image:', reviewImage);
  console.log('Line 14 - Delete route hit with imageId:', req.params.imageId);

  if (!reviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found"
    });
  }

  if (reviewImage.Review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden"
    });
  }

  await reviewImage.destroy();
  return res.json({
    message: "Successfully deleted"
  });
});

module.exports = router;
