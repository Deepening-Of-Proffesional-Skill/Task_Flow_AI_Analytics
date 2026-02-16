import verifyToken from "../middleware/verifyToken";    
import jwt from "jsonwebtoken";

// Mocking jwt
jest.mock("jsonwebtoken"); 

//create mock response object
const createResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
} 

//mock next function
const mockNext = jest.fn();

describe("verifyToken Middleware", () => {
    it("should return 401 if no token is provided", () => {
        const req = { headers: {}} //create mock request object without token
        const res = createResponse(); //create mock response object
        verifyToken(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Access denied. No token provided." });
    });

    it("Should return 403 if token invalid or expired", () => {
        //Mock jwt.verify to throw an error
        jwt.verify.mockImplementation(() => {
            throw new Error("Invalid token");
        });

        const req = {
            headers: {
                authorization: "Bearer invalidtoken"
            }
        }
        const res = createResponse();
        verifyToken(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid or expired token." });

    })

    it("Proceed to next middleware if token is valid", () => {
        jwt.verify.mockReturnValue({ userId: "ABC123" }); //Mock jwt.verify to return decoded token
    
        const req = {
            headers: {
                authorization: "Bearer validtoken"
            }
        }

        const res =  createResponse();
        verifyToken(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled(); //Check if next was called
        expect(req.user).toEqual({ userId: "ABC123"}); //Check if req.user was set with decoded token
        })
});