import axios from "axios";

export const fetchAIAnalytics = async () => {
    try{
        const token = localStorage.getItem('authToken');
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/ai-insights-cohere`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return data;
    } catch(error){
        console.error("Error fetching AI analytics:", error);
        throw ("Failed to fetch AI analytics. Please try again later.");
    }
}