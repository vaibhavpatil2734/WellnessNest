const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerUser,
  loginUser,
  verifyEmail,
  getUserById,
  updateUserProfile,
  getUserProgress,
  contactUs,
} = require("../controllers/userController");

const router = express.Router();

// Multer configuration for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages/"); // Save images in this directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Register route (with email verification)
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Email verification route
router.get("/verify-email/:token", verifyEmail);

// Get user by ID
router.get("/:id", getUserById);

// Get user progress
router.get("/user-progress/:id", getUserProgress);

// Update user profile (now accepts profile image)
router.put("/update-profile", upload.single("profileImage"), updateUserProfile);

// Contact support
router.post("/contact", contactUs);

module.exports = router;
