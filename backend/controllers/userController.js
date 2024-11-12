const nodemailer = require("nodemailer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verificationEmail = require("../emailTemplates/verificationEmail");
const util = require("util");


// Secret key for JWT (replace with your own secret key)
const JWT_SECRET = 'mySuperSecretJwtKey12345'; // Hardcoded JWT secret

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Request body:", req.body);

  if (!name || !email || !password) {
    console.error("Missing required fields");
    return res.status(400).json({ message: "Missing required fields (name, email, password)" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with hashed password and verification token
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken: jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message and user data
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
  const JWT_SECRET = 'mySuperSecretJwtKey12345'; // Same as in registerUser
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password }); 

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log("User found:", user ? user.email : "User not found");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log("JWT token generated:", token);

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      email: decoded.email,
      verificationToken: token,
    });

    if (user) {
      user.isVerified = true;
      user.verificationToken = null; // Clear the token after verification
      await user.save();
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
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    

    const { email, name, password, height, weight, gender, age } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.height = height || user.height;
    user.weight = weight || user.weight;
    user.gender = gender || user.gender;
    user.age = age || user.age;

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename.replace(/\\/g, '/')}`;
      
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      height: updatedUser.height,
      weight: updatedUser.weight,
      gender: updatedUser.gender,
      age: updatedUser.age,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

const contactUs = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ftracker60@gmail.com", // The email address you want to receive contact form submissions
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error sending contact form email:", error);
    res
      .status(500)
      .json({
        message: "Failed to send your message. Please try again later.",
      });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  getUserById,
  updateProfile,
  contactUs,
};
