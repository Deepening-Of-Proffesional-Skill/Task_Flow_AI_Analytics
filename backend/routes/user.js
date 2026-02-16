import express from 'express';
import { registerUser, logInUser, logOutUser, getProfile } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', logInUser);
router.post('/logout', logOutUser);
router.get('/profile', getProfile )




export default router;