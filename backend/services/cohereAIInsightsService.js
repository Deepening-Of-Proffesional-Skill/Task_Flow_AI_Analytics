import supabase from "../utils/supabaseClient.js";
import cohere from '../utils/cohereClient.js';

export async function cohereAIInsightsService(userId) {
    try {
        // Fetch user tasks from Supabase
        const { data: tasks, error:tasksError } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', userId);

            if(!tasks || tasks.length === 0) {
                return { message: 'No tasks found for the user', insights: [] };
            }
            if (tasksError) {
                throw tasksError;
            }

            // generate AI insights using cohere API

            const systemPrompt = `
                You are an AI assistant that analyzes a user's task data and generates a personalized productivity report in valid JSON format.

                Input: A list of tasks with fields:
                - title
                - category (work, personal, shopping, study, others)
                - priority (1=low, 2=medium, 3=high)
                - status (pending, in_progress, completed)
                - deadline
                - completed_at (optional)

                Generate JSON with this structure:

                {
                "patterns": {
                    "most_productive_days": [],
                    "least_productive_days": [],
                    "top_completed_categories": [],
                    "low_completed_categories": [],
                    "average_completion_time_hours": 0
                },
                "tips": [],
                "priority_suggestions": [],
                "forecast": {
                    "predicted_weekly_completion": 0,
                    "recommendation": ""
                },
                "motivational_messages": []
                }

                Guidelines:
                - Analyze patterns in completion times, categories, and days of the week.
                - Provide personalized tips and priority suggestions.
                - Predict weekly completion and provide recommendations.
                - Include motivational messages.
                - Return only JSON. Do not include explanations or comments.

            `
            const userContent = `Analyze these tasks and generate the JSON report as instructed.

                Tasks (array of objects):
                ${JSON.stringify(tasks, null, 2)}`;//null says to not change anything and 2 says to add 2 

            const response = await cohere.chat({
                model: 'command-a-03-2025',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userContent }
                ],
                max_tokens: 1000,
                temperature: 0.7, // Adjust for creativity in responses
            });

            let insightsText = response.message?.content?.[0]?.text || "";

            // Remove any code block formatting and parse JSON
            insightsText = insightsText.replace(/```json/g, "").replace(/```/g, "").trim();
            const insights = JSON.parse(insightsText);

            return  insights ;

        } catch (error) {
            console.error('Error generating insights cohere:', error);
            throw new Error('Failed to generate AI insights');
        }
}