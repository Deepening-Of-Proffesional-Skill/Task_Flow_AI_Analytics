import request from "supertest";
import express from "express";

//Mock Supabase before importing controller/route
jest.mock("../utils/supabaseClient.js", () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

//mock JWT before importing controller/routes ---
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

//Import after mock
import router from "../routes/user.js";
import supabase from "../utils/supabaseClient.js";
import jwt from "jsonwebtoken";

//Create fake Express app for testing
const app = express();
app.use(express.json());
app.use("/user", router);

describe("POST /user/logout", () => {
  //Suppress console logs/errors during tests
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  //Restore console behavior after all tests
  afterAll(() => {
    jest.restoreAllMocks();
  });

  //Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should logout user successfully", async () => {
    //Pretend the token is valid
    jwt.verify.mockReturnValue({ id: "123" });
    //Pretend Supabase logout succeeds
    supabase.auth.signOut.mockResolvedValue({ error: null });

    const res = await request(app)
      .post("/user/logout")
      .set("Authorization", "Bearer valid-token");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User logged out successfully");

    //Ensure our controller called JWT verify and Supabase signOut
    expect(jwt.verify).toHaveBeenCalledWith("valid-token", process.env.SECRET);
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  it("should return 401 if Authorization header missing", async () => {
    const res = await request(app).post("/user/logout");

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Authorization token missing");
  });

  it("should return 401 if token is invalid", async () => {
    //Simulate invalid token by throwing error in verify
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    const res = await request(app)
      .post("/user/logout")
      .set("Authorization", "Bearer invalid-token");

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Invalid or expired token");

    //Supabase signOut should not be called if token invalid
    expect(supabase.auth.signOut).not.toHaveBeenCalled();
  });

  it("should return 400 if supabase.signOut fails", async () => {
    jwt.verify.mockReturnValue({ id: "123" });
    supabase.auth.signOut.mockResolvedValue({ error: { message: "Signout failed" } });

    const res = await request(app)
      .post("/user/logout")
      .set("Authorization", "Bearer valid-token");

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Signout failed");
  });

  it("should return 500 if unexpected error occurs", async () => {
    jwt.verify.mockReturnValue({ id: "123" });
    //throw error to simulate unexpected failure
    supabase.auth.signOut.mockImplementation(() => {
      throw new Error("Unexpected error");
    });

    const res = await request(app)
      .post("/user/logout")
      .set("Authorization", "Bearer valid-token");

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Internal server error");
  });
});
