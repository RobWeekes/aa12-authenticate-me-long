const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth, setTokenCookie } = require('../../utils/auth');
const { SpotImage, Review, User, Spot, ReviewImage } = require('../../db/models');
const { validateReview } = require('../../utils/post-validators');

const router = express.Router();

// Delete a Spot image
router.delete('/spot-images/:spotId', requireAuth, validateReview, async (req, res) => {
  const spotId = req.params.spotId;  // is validateReview needed ^^ ?
  // check if the spot image exists
  const spotImage = await SpotImage.findByPk(spotId, {
    include: [{ model: Spot }]
  });
  if (!spotImage) {
    return res.status(404).json({ message: "Couldn't find a Spot Image with the specified id" });
  };  // check user permissions
  if (spotImage.Spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  };  // if user has access allow deletion
  await spotImage.destroy();
  return res.json({
    "message": "Successfully deleted"
  });
});



module.exports = router;
