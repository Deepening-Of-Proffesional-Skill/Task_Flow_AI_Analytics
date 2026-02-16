import axios from "axios";

export const fetchAIAnalytics = async () => {
    try{
        const token = localStorage.getItem('authToken');
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/ai-insights-cohere`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return data;
    } catch(error){
        console.error("Error fetching AI analytics:", error);
        throw error;
    }
}