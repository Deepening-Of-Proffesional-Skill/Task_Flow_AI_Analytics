import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
//for routing context
import { BrowserRouter } from "react-router-dom";
//component to test
import SignInForm from "../components/SignIn";
//mocking API calls
import axios from "axios";

//mock axios to control api call
jest.mock("axios");

describe("SignInForm Component", () => {
  //test case: check if the sign-in form renders correctly
  test("renders sign-in form", () => {
    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );

    //check if form elements are present
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  //test case: check if error messages are shown when fields are empty
  test("shows error message when fields are empty", () => {
    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );

    //click the sign-in button without filling the form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    //check if error message is displayed
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  //run before all tests in this file
  beforeAll(() => {
    //mock the window.alert function to prevent actual alerts during tests
    window.alert = jest.fn();
  });

  //test case: check if the api is called on form submission
  test("calls API on form submission", async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: "User created successfully" },
    });

    render(
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
    );

    //simulate filling the form fields
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    //simulate clicking the sign in button
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    //wait for the alert to be called and verify its content
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("successfully added");
    });
  });
});
