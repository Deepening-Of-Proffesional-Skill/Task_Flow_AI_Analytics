import express from 'express';
import { registerUser, logInUser, logOutUser } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', logInUser);
router.post('/logout', logOutUser);



export default router;