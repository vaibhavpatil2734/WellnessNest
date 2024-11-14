const nodemailer = require("nodemailer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verificationEmail = require("../emailTemplates/verificationEmail");
const util = require("util");

// Secret key for JWT (replace with your own secret key)
const JWT_SECRET = 'mySuperSecretJwtKey12345';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Register request body:", req.body);

  if (!name || !email || !password) {
    console.error("Missing required fields");
    return res.status(400).json({ message: "Missing required fields (name, email, password)" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken
    });

    await newUser.save();
    console.log("User saved successfully:", newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: { name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user. Please try again." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with:", { email, password });

  try {
    const user = await User.findOne({ email });
    console.log("User lookup result:", user ? `Found user: ${user.email}` : "User not found");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30d" });
    console.log("JWT token generated:", token);

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  console.log("Email verification attempt with token:", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findOne({ email: decoded.email, verificationToken: token });
    console.log("User found for verification:", user ? user.email : "No matching user");

    if (user) {
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
      console.log("User email verified and saved");

      res.status(200).json({ message: "Email verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid verification link" });
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  console.log("Getting user by ID:", req.params.id);

  try {
    const user = await User.findById(req.params.id).select("-password");
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const contactUs = async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form submission:", { name, email, message });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ftracker60@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Contact form email sent");

    res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error sending contact form email:", error);
    res.status(500).json({ message: "Failed to send your message. Please try again later." });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId, username, email, height, weight, gender, age } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile data
    user.username = username || user.username;
    user.email = email || user.email;
    user.height = height || user.height;
    user.weight = weight || user.weight;
    user.gender = gender || user.gender;
    user.age = age || user.age;

    // Save the updated user data
    await user.save();

    // Send a success response
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  verifyEmail,
  getUserById,
  contactUs,
};
