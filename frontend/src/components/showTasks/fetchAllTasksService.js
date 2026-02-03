import axios from 'axios';

export const fetchTasks = async () => {
    try {
        const token = localStorage.getItem('authToken');

        const {data} = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/fetchAllTasks`, 
            {}, 
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return data.tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

