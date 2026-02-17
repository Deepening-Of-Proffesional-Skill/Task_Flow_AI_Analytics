import {cohereAIInsightsService} from '../services/cohereAIInsightsService.js';

export async function cohereAIInsightsController(req, res) {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const insights =  await cohereAIInsightsService(userId);
        return res.status(200).json({
            insights: insights 
        });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
}