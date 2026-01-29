import getTasks from '../controllers/fetchTasks.js';
import express from 'express';
const router = express.Router();

router.post('/', getTasks);

export default router;