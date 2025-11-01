import express from 'express';
import { admin, protect } from '../Middlewares/authMiddleware.js';
import { getProfile, login, register } from '../Controllers/authController.js';

const router = express.Router();

// Public: Login
router.post('/login', login);

// Protected: Register (admin-only)
router.post('/register', register);

// Protected: Get profile
router.get('/profile', protect, getProfile);

export default router;