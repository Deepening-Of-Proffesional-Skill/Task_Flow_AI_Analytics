
export const fetchTasks = async () => {
    try {
        const response =await fetch(`${import.meta.env.REACT_API_URL}/tasks`);
        const data = await response.json();
        if ( response.ok ) {
            return data.tasks;
        } else {
            throw new Error(data.error || 'Failed to fetch tasks');
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}