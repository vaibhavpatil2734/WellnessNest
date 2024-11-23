const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerUser,
  loginUser,
  verifyEmail,
  getUserById, 
  updateUserProfile,
  contactUs
} = require("../controllers/userController");

const router = express.Router();

// Register route (with email verification)
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Email verification route
router.get("/verify-email/:token", verifyEmail);

router.get("/:id", getUserById);


router.post("/contact", contactUs);
router.post("/updateUserProfile", updateUserProfile);

module.exports = router;
