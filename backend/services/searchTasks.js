import supabase from "../utils/supabaseClient.js";

async function searchTasks(userId, title, deadline, category, priority, status) {
    let query = supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId);

        if (title) {
            query = query.ilike('title', `%${title}%`);
        }
        if (deadline) {
            const start = `${deadline}T00:00:00`;
            const end = `${deadline}T23:59:59.999`;

            query = query.gte("deadline", start).lte("deadline", end);
        }
        if (category && category !== 'All') {
            query = query.eq('category', category);
        }
        if (priority && priority !== 'All') {
            query = query.eq('priority', parseInt(priority));
        }
        if (status && status !== 'All') {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) {
            const err = new Error('Error searching tasks');
            err.status = 500;
            throw err;
        } 
        if (!data || data.length === 0 ) {
            return [];
        }
        return data;
}
export default searchTasks;