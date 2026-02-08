// LogIn.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LogIn from "../components/Login";
import axios from "axios";
//for handling async updates
import { act } from "@testing-library/react";

//mock the axios library to control API responses in tests
jest.mock("axios");

//run before each test in this file
beforeEach(() => {
  //mock localStorage.setItem to prevent actual storage updates during tests
  Storage.prototype.setItem = jest.fn();
});

describe("LogIn Component", () => {
  //test case: check if the login form renders correctly
  test("renders login form", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    //verify that all form elements are present
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  //test case: check if error messages are shown when fields are empty
  test("shows error message when fields are empty", () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    //simulate clicking the login button without filling the form
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    //verify that the error message is displayed
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  //test case: check if the API is called on form submission
  test("calls API on form submission", async () => {
    //mock the api response
    axios.post.mockResolvedValueOnce({
      data: { token: "mocked_token" },
    });

    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );

    //simulate filling the form fields
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    //simulate clicking the login button
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    //verify that localStorage.setItem is called with the correct arguments
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "authToken",
      expect.any(String)
    );
  });
});
