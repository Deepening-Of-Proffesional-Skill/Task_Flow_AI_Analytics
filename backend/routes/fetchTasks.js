import getTasks from '../controllers/fetchTasks.js';
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/', verifyToken, getTasks);

export default router;