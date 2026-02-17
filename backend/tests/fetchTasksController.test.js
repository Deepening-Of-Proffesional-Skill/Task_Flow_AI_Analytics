//mock supabase client
jest.mock("../utils/supabaseClient", () => ({
    default: {
        from: jest.fn()
    }
}));

import fetchTasks from "../services/fetchTasks";
import getTasks from "../controllers/fetchTasks";


// Mock the fetchTasks service
jest.mock('../services/fetchTasks');

//create mock response object
const createResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
}


describe("fetchTasks Controller", () => {
    it("should return 400 and error message when userId is not provided", async () => {
        const req = { user: {} }; //mock request object without userId
        const res = createResponse(); //create mock response object

        await getTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'User ID is required' });
    })

    it("should return 200 and tasks when userId is provided", async () => {
        const mockTasks = [
            {
                "id": "a1f0t68hy",
                "user_id": "1234",
                "title": "Finish project report",
                "description": "Complete the quarterly project report and send to management.",
                "priority": 2,
                "deadline": "2026-02-10T17:00:00+00:00",
                "status": "pending",
                "created_at": "2026-02-03T10:52:14.968247+00:00",
                "updated_at": "2026-02-03T10:52:14.968247+00:00",
                "category": "work",
                "completed_at": null
            },
            {
                "id": "b2d1e399hfjfhj",
                "user_id": "1234",
                "title": "Team meeting",
                "description": "Organize and host the weekly team sync-up meeting.",
                "priority": 1,
                "deadline": "2026-02-05T09:30:00+00:00",
                "status": "in_progress",
                "created_at": "2026-02-03T10:52:14.968247+00:00",
                "updated_at": "2026-02-03T10:52:14.968247+00:00",
                "category": "work",
                "completed_at": null
            },
            {
                "id": "c3e2f4aa7584587hf",
                "user_id": "1234",
                "title": "Update documentation",
                "description": "Revise API documentation with latest changes.",
                "priority": 3,
                "deadline": "2026-02-15T12:00:00+00:00",
                "status": "pending",
                "created_at": "2026-02-03T10:52:14.968247+00:00",
                "updated_at": "2026-02-03T10:52:14.968247+00:00",
                "category": "work",
                "completed_at": null
            }
        ];

        //Mock fetchTasks to return mockTasks
        fetchTasks.mockResolvedValue(mockTasks);

        const req = {
            user: { id: "1234" } //mock request object with userId
        };
        const res = createResponse(); //create mock response object

        await getTasks(req, res);

        expect(fetchTasks).toHaveBeenCalledWith("1234");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Tasks fetched successfully',
            tasks: mockTasks
        })

    })

    it("Should return 500 when fetchTasks throws an error without status", async () => {
        //Mock fetchTasks to throw an error
        fetchTasks.mockRejectedValue(new Error("Database connection failed"));

        const req = {
            user: { id: "1234" }
        };
        const res = createResponse();
        await getTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Database connection failed" });
        
    })

    it("Should return error status and message when fetchTasks throws an error with status", async () => {
        //Mock fetchTasks to throw an error with status
        const err = new Error("Service unavailable");
        err.status = 503;

        fetchTasks.mockRejectedValue(err);

        const req = {
            user: {id: "1234"}
        }
        const res = createResponse();

        await getTasks(req,res);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            error: "Service unavailable"
        })
        
    })
})