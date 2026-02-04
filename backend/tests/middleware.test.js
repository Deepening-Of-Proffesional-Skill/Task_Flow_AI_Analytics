import jwt from "jsonwebtoken";
//import middleware function to test
import { authenticateToken } from "../middleware/auth.js";

//mock the jsonwebtoken library to control its behavior during testing
jest.mock("jsonwebtoken");

/*This test suite is for the `authenticateToken` middleware function, the middleware is responsible for verifying the validity of a JWT
and ensuring that only authenticated users can access protected routes.*/

describe("Auth Middleware", () => {
  //ensure the next function is called when the token is valid
  it("should call next if token is valid", () => {
    //mock rqst obj with an authorization header containing a valid token
    const req = {
      //simulates a request with a Bearer token
      headers: { authorization: "Bearer validtoken" },
    };
    const res = {};
    const next = jest.fn();

    jwt.verify.mockReturnValue({ id: "123" });
    //call the middleware function with the mocked request, response, and next
    authenticateToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
