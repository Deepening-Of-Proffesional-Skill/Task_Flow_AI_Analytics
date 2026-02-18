import supabase from "../utils/supabaseClient";
import searchTasks from "../services/searchTasks";

jest.mock("../utils/supabaseClient.js", () => ({
    from: jest.fn() //mock the from method to return a query object that supports chaining
}));

const createMockQuery = (result) => {
    //Query object that supports chaining methods like eq, ilike, gte, lte 
    const query = {
        select: jest.fn(() => query),
        eq: jest.fn(() => query),
        ilike: jest.fn(() => query),
        gte: jest.fn(() => query),
        lte: jest.fn(() => query),

        // make the query return a promise and resolve with the provided result when awaited
        then: (resolve) => resolve(result),
    };

    return query;
};


describe("Search Tasks Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

              
    //Test case for searching tasks with title and category filters
    it("filters tasks by title and category", async () => {
        const mockResult = {
            data: [
                { id: 1, title: "Buy milk", category: "Personal" },
                { id: 2, title: "Buy groceries", category: "Personal" }
            ],
            error: null,
        };

        const mockQuery = createMockQuery(mockResult);//Create a mock query returns the mock result when awaited
        supabase.from.mockReturnValue(mockQuery); // Mock supabase.from to return the mock query object

        const result = await searchTasks(
            "user1",        // userId
            "Buy",          // title filter
            null,           // deadline
            "Personal",     // category filter
            null,           // priority
            null            // status
        );

        expect(supabase.from).toHaveBeenCalledWith("tasks");
        expect(mockQuery.eq).toHaveBeenCalledWith("user_id", "user1");
        expect(mockQuery.ilike).toHaveBeenCalledWith("title", "%Buy%");
        expect(mockQuery.eq).toHaveBeenCalledWith("category", "Personal");
        expect(result).toEqual(mockResult.data);
    });

    //Test case for no tasks found
    it("returns empty array when no tasks found", async () => {
        const mockResult = {
            data: [],
            error: null,
        };

        const mockQuery = createMockQuery(mockResult);
        supabase.from.mockReturnValue(mockQuery);

        const result = await searchTasks(
            "user1",
            "School tasks",
            null,
            null,
            null,
            null
        );

        expect(supabase.from).toHaveBeenCalledWith("tasks");
        expect(mockQuery.eq).toHaveBeenCalledWith("user_id", "user1");
        expect(mockQuery.ilike).toHaveBeenCalledWith("title", "%School tasks%");
        expect(result).toEqual([]);
    });

    //Test case for error during search
    it("throws error when search fails", async () => {
        const mockResult = {
            data: null,
            error: "Error searching tasks",
        };

        const mockQuery = createMockQuery(mockResult);
        supabase.from.mockReturnValue(mockQuery);

        await expect(searchTasks("user1", "School tasks", null, "Personal", null, null)).rejects.toThrow("Error searching tasks");
        await expect(searchTasks("user1", "School tasks", null, "Personal", null, null)).rejects.toHaveProperty("status", 500);
    });
});