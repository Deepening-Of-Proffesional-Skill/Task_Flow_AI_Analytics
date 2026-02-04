import searchTasks from "../services/searchTasks.js";

async function searchFilteredTasks(req, res) {
    try {
        const {userId, title, deadline, category, priority, status} = req.body; 

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const tasks = await searchTasks(userId, title, deadline, category, priority, status);
        return res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks: tasks 
        });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
}
export default searchFilteredTasks;