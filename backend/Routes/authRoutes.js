import express from 'express';
import { admin, protect } from '../Middlewares/authMiddleware.js';
import { getProfile, login, register } from '../Controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', protect, getProfile);

export default router;