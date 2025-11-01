// import { signToken } from '../Config/auth.js';
// import Admin from '../Models/adminModel.js';

// export const register = async (req, res) => {
//   try {
//     const { username, email, password, isAdmin = false } = req.body;
//     const userExists = await Admin.findOne({ $or: [{ email }, { username }] });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const user = await Admin.create({ username, email, password, isAdmin });
//     const token = signToken(user._id);
//     res.status(201).json({
//       message: 'User registered',
//       token,
//       user: { id: user._id, username, email, isAdmin }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await Admin.findOne({ email }).select('+password');
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = signToken(user._id);
//     res.json({
//       token,
//       user: { id: user._id, username: user.username, email, isAdmin: user.isAdmin }
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getProfile = async (req, res) => {
//   res.json({
//     user: {
//       id: req.user._id,
//       username: req.user.username,
//       email: req.user.email,
//       isAdmin: req.user.isAdmin
//     }
//   });
// };


import Admin from "../Models/adminModel.js";
import { signToken } from "../Config/auth.js";

// =============================
// @desc   Register Admin
// @route  POST /api/auth/register
// @access Public or Admin-only (based on route setup)
// =============================
export const register = async (req, res) => {
  try {
    const { username, email, password, isAdmin = false } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email, and password",
      });
    }

    // Check for existing user
    const existingUser = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists",
      });
    }

    // Create user
    const user = await Admin.create({ username, email, password, isAdmin });
    const token = signToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// =============================
// @desc   Login Admin
// @route  POST /api/auth/login
// @access Public
// =============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Find user and validate password
    const user = await Admin.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = signToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// =============================
// @desc   Get Logged-in Admin Profile
// @route  GET /api/auth/profile
// @access Protected
// =============================
export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

