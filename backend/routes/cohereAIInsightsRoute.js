import express from 'express';
import {cohereAIInsightsController} from '../controllers/cohereAIInsightsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, cohereAIInsightsController);

export default router;