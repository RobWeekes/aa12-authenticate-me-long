const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImage, Review, User, Spot, ReviewImage } = require('../../db/models');
// const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');

const router = express.Router();

// Delete a Spot image
router.delete('/spot-images/:spotId', requireAuth, validateReview, async (req, res) => {
  const { spotId } = req.params;

  // Check if the spot image exists
  const spotImage = await SpotImage.findByPk(spotId);
  if (!spotImage) {
    return res.status(404).json({ message: "Couldn't find a Spot Image with the specified id" });
  }

  else return res.json({
    "message": "Successfully deleted"
  })
})
