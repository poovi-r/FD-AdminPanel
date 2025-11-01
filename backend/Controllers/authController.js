import { signToken } from '../Config/auth.js';
import Admin from '../Models/adminModel.js';

export const register = async (req, res) => {
  try {
    const { username, email, password, isAdmin = false } = req.body;
    const userExists = await Admin.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await Admin.create({ username, email, password, isAdmin });
    const token = signToken(user._id);
    res.status(201).json({
      message: 'User registered',
      token,
      user: { id: user._id, username, email, isAdmin }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user._id);
    res.json({
      token,
      user: { id: user._id, username: user.username, email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      isAdmin: req.user.isAdmin
    }
  });
};

