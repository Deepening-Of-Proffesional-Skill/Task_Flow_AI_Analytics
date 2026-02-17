//mock supabase client
jest.mock("../utils/supabaseClient", () => {
    const mockSupabase = {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),//Default mock implementation for eq, can be overridden in specific tests
    }
    return mockSupabase;
});

import supabase from "../utils/supabaseClient";
import fetchTasks from "../services/fetchTasks";

describe("Fetch Tasks Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    //Test case for successful fetch
    it("Return tasks when data exists", async () => {
        const mockTasks = [
            { id: 1, title: "Task 1", user_id: "ABC123" },
            { id: 2, title: "Task 2", user_id: "ABC123" }
        ];
        supabase.eq.mockResolvedValue({ data: mockTasks , error: null });

        const result = await fetchTasks("ABC123");
        
        expect(supabase.eq).toHaveBeenCalledWith("user_id", "ABC123");
        expect(result).toEqual(mockTasks);
    });

    //Test case for no tasks found
    it("Return empty array when no tasks found", async () => {
        supabase.eq.mockResolvedValue({data: [], error: null });

        const result =  await fetchTasks("ABC123");

        expect(supabase.eq).toHaveBeenCalledWith("user_id", "ABC123");
        expect(result).toEqual([]);
    });

    //Test case for error during fetch
    it("Trow error when fetch fails", async () => {
        supabase.eq.mockResolvedValue({ data: null, error: "Database error" });
        
        //Check if fetchTasks throws an error with the correct message and status
        await expect(fetchTasks("ABC123")).rejects.toThrow("Error fetching tasks");
        await expect(fetchTasks("ABC123")).rejects.toHaveProperty("status", 500);
    });
});