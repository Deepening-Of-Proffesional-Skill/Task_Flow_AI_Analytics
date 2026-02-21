import axios from 'axios';

export const searchTasksService = async (filters) => {
    try {
        const token = localStorage.getItem('authToken');
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/searchTasks`,
            filters,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return data.tasks;
    } catch (error) {
        console.error('Error searching tasks:', error);
        throw error;
    }
};