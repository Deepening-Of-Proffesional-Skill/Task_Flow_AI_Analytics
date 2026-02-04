import searchFilteredTasks from "../controllers/searchTasks.js";
import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/', verifyToken, searchFilteredTasks);

export default router;