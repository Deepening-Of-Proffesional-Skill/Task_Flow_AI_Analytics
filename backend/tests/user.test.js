/**
 * user.test.js
 This file tests:
   - Login API
   - Signup API
donot test Supabase or JWT library.
mock them and only test our controller logic.
 */

//supertest lets us call our API like a real frontend request
import request from "supertest";
import express from "express";

/**
mock before importing anything that uses supabase or jwt
 */

//fake Supabase
jest.mock("../utils/supabaseClient.js", () => ({
  auth: {
    //for login
    signInWithPassword: jest.fn(),
    signUp: jest.fn(), //for signup
  },
}));

//fake JWT
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "fake-jwt-token"), //always return this token
}));

//import after mocks
import router from "../routes/user.js";
import supabase from "../utils/supabaseClient.js";

/**
Create a fake express app ONLY for testing
We don't start the real server
 */
const app = express();
app.use(express.json());
app.use("/user", router);

//test login api

describe("POST /user/login", () => {
  //test: successful login
  it("should login user and return token", async () => {
    //tell supabase what to return
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: {
        user: { id: "123", email: "test@mail.com" },
      },
      error: null,
    });
    //call the API
    const res = await request(app)
      .post("/user/login")
      .send({ email: "test@mail.com", password: "123456" });
    //check the response
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBe("fake-jwt-token");
    expect(res.body.user.email).toBe("test@mail.com");
  });

  //test: invalid credentials
  it("should return 401 if credentials are wrong", async () => {
    //pretend supabase failed login
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: "Invalid login" },
    });
    const res = await request(app)
      .post("/user/login")
      .send({ email: "wrong@mail.com", password: "wrong" });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Invalid credentials");
  });

  //test: missing email/password
  it("should return 400 if email or password missing", async () => {
    const res = await request(app).post("/user/login").send({ email: "" });
    expect(res.statusCode).toBe(400);
  });
});

//test signup api
describe("POST /user/signup", () => {
  it("should register user successfully", async () => {
    //pretend supabase created a user
    supabase.auth.signUp.mockResolvedValue({
      data: { user: { email: "new@mail.com" } },
      error: null,
    });
    const res = await request(app).post("/user/signup").send({
      email: "new@mail.com",
      password: "123456",
      full_name: "Test User",
      phone_number: "999999",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("new@mail.com");
  });

  //test: missing fields
  it("should return 400 if required fields missing", async () => {
    const res = await request(app).post("/user/signup").send({
      email: "",
    });

    expect(res.statusCode).toBe(400);
  });
});
