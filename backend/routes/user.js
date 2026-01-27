import express from 'express';
import { registerUser, logInUser } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', logInUser);


export default router;