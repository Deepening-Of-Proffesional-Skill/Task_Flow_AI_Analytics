import supabase from "../utils/supabaseClient";

async function fetchTasks(userId) {
    const { data, error } = await supabase
        .from('Tasks')
        .select('*')
        .eq('user_id', userId);

        if (error) {
            const err = new Error('Error fetching tasks');
            err.status = 500;
            throw err;
        } 
        if (!data || data.length === 0 ) {
            const err = new Error('No tasks found for the user');
            err.status = 404;
            throw err;
        }
        return data;
}
export default fetchTasks;