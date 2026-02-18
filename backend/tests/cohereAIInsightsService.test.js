import { cohereAIInsightsService } from "../services/cohereAIInsightsService";
import supabase from "../utils/supabaseClient";
import cohere from "../utils/cohereClient";

//mock supabase client
jest.mock("../utils/supabaseClient", () => {
    const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
    }
    return mockSupabase;
});

//mock cohere client
jest.mock("../utils/cohereClient", () => ({
  chat: jest.fn(),
}));

describe("Cohere AI Insights Service", () => {
    //Clear mocks after each test to prevent interference between tests
    afterEach(() => {
        jest.clearAllMocks();
    });

    //Test case for successful insights generation
    it("should return insights when tasks are found", async () => {
        const mockTasks = {
            data: [
                {
                    id: 1,
                    title: "Task 1",
                    category: "work",
                    priority: 3,
                    status: "completed",
                    deadline: "2024-06-30T23:59:59Z",
                    completed_at: "2024-06-25T12:00:00Z",
                    user_id: "ABC123"
                },
                {
                    id: 2,
                    title: "Task 2",
                    category: "personal",
                    priority: 2,
                    status: "in-progress",
                    deadline: "2024-07-15T23:59:59Z",
                    completed_at: null,
                    user_id: "ABC123"
                }
            ],
            error: null
        }

        supabase.eq.mockResolvedValue(mockTasks);

        const mockInsightsResponse = {
            message: {
                content:[
                    {text: JSON.stringify({
                    patterns: {
                        most_productive_days: ["Monday", "Wednesday"],
                        least_productive_days: ["Friday"],
                        top_completed_categories: ["work"],
                        low_completed_categories: ["personal"],
                        average_completion_time_hours: 5
                    },
                    tips: ["Focus on high-priority tasks in the morning."],
                    priority_suggestions: ["Consider moving some personal tasks to lower priority."],
                    forecast: {
                        predicted_weekly_completion: 4,
                        recommendation: "Try to complete at least one personal task each week for better work-life balance."
                    },
                    motivational_messages: ["Great job on completing your tasks! Keep up the good work!"]
                })}]
            }
        };

        //Mock cohere.chat to return the mock insights response when called
        cohere.chat.mockResolvedValue(mockInsightsResponse);

        const insights = await cohereAIInsightsService("ABC123");

        expect(supabase.from).toHaveBeenCalledWith("tasks");
        expect(supabase.eq).toHaveBeenCalledWith("user_id", "ABC123");
        expect(insights.patterns).toBeDefined();
        expect(insights.tips).toBeDefined();
        expect(insights.priority_suggestions).toBeDefined();
        expect(insights.forecast).toBeDefined();
        expect(insights.motivational_messages).toBeDefined();


    });

    //Test case for no tasks found
    it("should return message when no tasks found", async () => {
        const mockTasks = {
            data: [],
            error: null
        }

        supabase.eq.mockResolvedValue(mockTasks);
        const result = await cohereAIInsightsService("ABC123");

        expect(supabase.from).toHaveBeenCalledWith("tasks");
        expect(supabase.eq).toHaveBeenCalledWith("user_id", "ABC123");
        expect(result).toEqual({ message: 'No tasks found for the user', insights: [] });
    });

    //Test case for database error
    it("should throw error when database error occurs", async () => {
        const mockTasks = {
            data: null,
            error: "Database error"
        }
        supabase.eq.mockResolvedValue(mockTasks);

        await expect(cohereAIInsightsService("ABC123")).rejects.toThrow("Failed to generate AI insights");
    });

    //  Test case for cohere API error
    it("should throw error when cohere API call fails", async () => {
        const mockTasks = {
            data: [
                {
                    id: 1,
                    title: "Task 1",
                    category: "work",
                    priority: 3,
                    status: "completed",
                    deadline: "2024-06-30T23:59:59Z",
                    completed_at: "2024-06-25T12:00:00Z",
                    user_id: "ABC123"
                }
            ],
            error: null
        }
        supabase.eq.mockResolvedValue(mockTasks);
        
        cohere.chat.mockRejectedValue(new Error("Cohere API error"));

        await expect(cohereAIInsightsService("ABC123")).rejects.toThrow("Failed to generate AI insights");
    });
});