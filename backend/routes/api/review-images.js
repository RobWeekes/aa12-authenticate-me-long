// backend/routes/api/review-images.js
const express = require('express');
const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  const imageId = req.params.imageId;
  const image = await ReviewImage.findByPk(imageId);
  
  await image.destroy();
  
  res.json({ message: "Successfully deleted" });
});

module.exports = router;