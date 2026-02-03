import supabase from "../utils/supabaseClient.js";

async function fetchTasks(userId) {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId);

        if (error) {
            const err = new Error('Error fetching tasks');
            err.status = 500;
            throw err;
        } 
        if (!data || data.length === 0 ) {
            const err = new Error(`No tasks found for the user ${userId}`);
            err.status = 404;
            throw err;
        }
        return data;
}
export default fetchTasks;