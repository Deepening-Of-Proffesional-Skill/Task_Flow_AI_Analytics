import searchTasks from "../services/searchTasks";
import searchFilteredTasks from "../controllers/searchTasks.js";

//create mock searchTasks function
jest.mock("../services/searchTasks");

const createResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
}

describe("searchTasks Controller", () => {
    //Test case to check if userId is not provided in req.user
    it("Should return 400 and error message when userId is not provided", async () => {
        const req = {
            user: {},
            body: {
                title: "",
                deadline: "",
                category: "",
                priority: "",
                status: "pending"
            }
        }
        const res = createResponse();

        await searchFilteredTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "User ID is required"});
    })



    //Test case to check if searchTasks returns tasks successfully
    it("Should return tasks and 200 when userId is provided", async () => {
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
                "status": "pending",
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

        const req = {
            user: {
                id: "1234"
            },
            body: {
                title: "",
                deadline: "",
                category: "",
                priority: "",
                status: "pending"
            }
        }
        const res = createResponse();
        
        searchTasks.mockResolvedValue(mockTasks);

        await searchFilteredTasks(req, res);

        expect(searchTasks).toHaveBeenCalledWith(
            "1234", 
            "", 
            "", 
            "", 
            "", 
            "pending"
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Tasks fetched successfully",
            tasks: mockTasks
        });
    })


    //Test case to check if searchTasks throws an error without status property
    it("Should return 500 and error message when searchTasks throws an error without status", async () => {
        const req = {
            user: {
                id: "1234"
            },
            body: {
                title: "",
                deadline: "",
                category: "",
                priority: "",
                status: "pending"
            }
        }
        const res = createResponse();

        searchTasks.mockRejectedValue(new Error("Database connection failed"));

        await searchFilteredTasks(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Database connection failed" });

        
    })



    //Test case to check if searchTasks throws an error with status property
    it("Should return error status and message when searchTasks throws an error with status", async () => {
        const req = {
            user: {
                id: "1234"
            },
            body: {
                title: "",
                deadline: "",
                category: "",
                priority: "",
                status: "pending"
            }
        }
        const res = createResponse();
        const err = new Error("Service unavailable");
        err.status = 503;

        searchTasks.mockRejectedValue(err);

        await searchFilteredTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.json).toHaveBeenCalledWith({
            error: "Service unavailable"
        });
    })



    //Test case to check if searchTasks returns empty array when no tasks match the filters
    it("Should return empty array when no tasks match the filters", async () => {
        const mockTasks = []; //No tasks match the filters
        const req = {
            user: {
                id: "1234"
            },
            body: {
                title: "Nonexistent Task",
                deadline: "",
                category: "",
                priority: "",
                status: "pending"
            }
        }
        const res = createResponse();
        searchTasks.mockResolvedValue(mockTasks);

        await searchFilteredTasks(req, res);

        expect(searchTasks).toHaveBeenCalledWith(
            "1234", 
            "Nonexistent Task",
            "",
            "",
            "",
            "pending"
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Tasks fetched successfully",
            tasks: mockTasks
        });
    })

})