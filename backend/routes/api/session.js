// backend/routes/api/session.js
const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateLogin } = require('../../utils/post-validators');

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();


// const validateLogin = [
//   check('credential')
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage("Email or username is required"),
//   check('password')
//     .exists({ checkFalsy: true })
//     .withMessage("Password is required"),
//   handleValidationErrors
// ];

// session paths start with '/session' (handled by router in index.js)

// Get the Current User / Restore session
router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

// Log in a User
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });
  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Invalid credentials");
    return res.status(401).json({
      "message": "Invalid credentials"
    });
  }
  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };
  await setTokenCookie(res, safeUser);
  return res.json({
    user: safeUser,
  });
});

// To test log in locally in the browser console, run this fetch:
// await fetch('/api/session', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": "<PASTE IN XSRF-TOKEN>"
//   },
//   body: JSON.stringify({
//     credential: "Demo-lition",
//     password: "password"
//   })
// }).then(res => res.json()).then(data => console.log(data));

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});



module.exports = router;
