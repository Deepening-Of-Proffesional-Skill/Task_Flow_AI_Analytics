import fetchTasks from "../services/fetchTasks.js";

async function getTasks(req, res) {
    try {
        const userId = req.user.id; 

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const tasks = await fetchTasks(userId);
        return res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks: tasks 
        });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
    }
}
export default getTasks;