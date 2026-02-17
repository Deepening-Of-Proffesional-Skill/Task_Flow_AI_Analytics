//mock supabase client
jest.mock("../utils/supabaseClient", () => ({
    default: {
        from: jest.fn()
    }
}));

import { cohereAIInsightsService } from "../services/cohereAIInsightsService.js";
import { cohereAIInsightsController } from "../controllers/cohereAIInsightsController.js";

//mock the cohereAIInsightsService module
jest.mock("../services/cohereAIInsightsService");

//create mock response object
const createResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
}

describe("Cohere AI Insights Controller", () => {
    //Before each test, clear all mocks
    beforeEach(() => {
        jest.clearAllMocks();
    });

    //Test case to check if userId is not provided in req.user
    it("Should return 400 and error message when userId is not provided", async () => {
        const req = {
            user: {}
        }
        const res = createResponse();

        await cohereAIInsightsController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "User ID is required"});
    });

    //Test case to check if cohereAIInsightsService returns insights successfully
    it("Should return status 200 and insights when successful", async() => {
        const mockInsights = {
            "total_tasks": 10,
            "completed_tasks": 7,
            "pending_tasks": 3,
            "overdue_tasks": 1,
            "upcoming_tasks": 2,
            "tasks_by_category": {

            },
            "tips": [
                "Try to complete pending tasks before their deadlines to avoid overdue tasks.",
                "Consider prioritizing tasks based on their importance and urgency."
            ]
        };
        cohereAIInsightsService.mockResolvedValue(mockInsights);

        const req = {
            user: {
                id: "1234"
            }
        };
        const res = createResponse();
        await cohereAIInsightsController(req, res);

        expect(cohereAIInsightsService).toHaveBeenCalledWith("1234");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ insights: mockInsights });
    })

    //Test case to check if cohereAIInsightsService throws an error and message
    it("Should return status and message which returns by service when there is an error in service", async() => {
        const mockError = new Error("Service error");
        mockError.status = 500;
        cohereAIInsightsService.mockRejectedValue(mockError);

        const req = {
            user: {
                id: "1234"
            }
        };
        const res = createResponse();
        await cohereAIInsightsController(req, res);

        expect(cohereAIInsightsService).toHaveBeenCalledWith("1234");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Service error" });
    });

    //Test case should return 500 when service throws an error without status property
    it("Should return 500 and error message when service throws an error without status property", async() => {
        const mockError = new Error("Service error without status");
        cohereAIInsightsService.mockRejectedValue(mockError);

        const req = {
            user: {
                id: "1234"
            }
        };
        const res = createResponse();
        await cohereAIInsightsController(req, res);

        expect(cohereAIInsightsService).toHaveBeenCalledWith("1234");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Service error without status" });
    });
});
