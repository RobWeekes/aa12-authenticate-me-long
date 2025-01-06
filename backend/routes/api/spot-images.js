const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth, setTokenCookie } = require('../../utils/auth');
const { SpotImage, Review, User, Spot, ReviewImage } = require('../../db/models');

const router = express.Router();

// Spot-image paths start with '/spot-images' (handled by router in index.js)

// Delete a Spot image
router.delete('/:spotImageId', requireAuth, async (req, res) => {
  const spotImageId = req.params.spotImageId;
  // check if the spot image exists
  const spotImage = await SpotImage.findByPk(spotImageId, {
    include: [{
      model: Spot,
      attributes: ['ownerId']
     }],
  });
  if (!spotImage) {
    return res.status(404).json({ message: "Spot Image couldn't be found" });
  };  // check user permissions
  if (spotImage.Spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  };  // if user has access allow deletion
  // console.log(`User ${spotImage.Spot.ownerId} has access:`)
  await spotImage.destroy();
  return res.json({
    "message": "Successfully deleted"
  });
});



module.exports = router;
