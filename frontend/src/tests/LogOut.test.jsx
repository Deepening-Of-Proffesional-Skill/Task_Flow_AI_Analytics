import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Logout from "../components/Logout.jsx";
/*
  beforeEach runs BEFORE every test.
  We use it to prepare all mocks so every test starts fresh
*/
beforeEach(() => {
  //clears previous mock calls between tests
  jest.clearAllMocks();

  //JSDOM does not implement alert and confirm so we REPLACE them with fake functions (mocks)
  window.confirm = jest.fn();
  window.alert = jest.fn();

  //logout component uses console.error in catch block so silence it so Jest output stays clean
  jest.spyOn(console, "error").mockImplementation(() => {});

  /*
    Correct way to mock localStorage/sessionStorage in Jest.
    We DO NOT replace localStorage object.
    Instead we spy on its prototype methods.
  */
  jest.spyOn(Storage.prototype, "clear");
  jest.spyOn(Storage.prototype, "getItem");
  jest.spyOn(Storage.prototype, "setItem");
  jest.spyOn(Storage.prototype, "removeItem");

  //when component asks for authToken, return this fake token
  localStorage.getItem.mockReturnValue("mocked_token");

  /*mocking fetch so no real API call happens.
    by default, it returns a successful logout response.
  */
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Logout successful" }),
    })
  );
});

/*
  afterEach runs AFTER every test.
  It restores everything back to normal.
*/
afterEach(() => {
  jest.restoreAllMocks();
});

describe("Logout Component", () => {
  /*
    Test 1:
    Check if the logout button is visible on screen.
  */
  test("renders logout button", () => {
    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    //find button by text Logout
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  /*
    Test 2:
    If user confirms logout, storage should be cleared.
  */
  test("confirms logout and clears storage", async () => {
    //user clicks ok in confirm dialog
    window.confirm.mockReturnValue(true);

    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    //click the logout button
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    //check confirm popup was shown
    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to log out?"
    );

    //wait for async logout process to complete
    await waitFor(() => {
      expect(localStorage.clear).toHaveBeenCalled();
      expect(sessionStorage.clear).toHaveBeenCalled();
    });
  });

  /*
    Test 3:
    If user cancels logout, nothing should happen.
  */
  test("does not logout if user cancels", () => {
    // User clicks "Cancel"
    window.confirm.mockReturnValue(false);

    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    //storage should not be cleared
    expect(localStorage.clear).not.toHaveBeenCalled();
    expect(sessionStorage.clear).not.toHaveBeenCalled();
  });

  /*
    Test 4:
    Check if API is called with correct headers and token.
  */
  test("calls API on logout request and handles success", async () => {
    window.confirm.mockReturnValue(true);

    //override default fetch to ensure success response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "Logout successful" }),
    });

    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    //verify correct API call with token
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/user/logout",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "Bearer mocked_token",
            "Content-Type": "application/json",
          }),
        })
      );
    });

    //storage should be cleared after successful logout
    expect(localStorage.clear).toHaveBeenCalled();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });

  /*
    Test 5:
    If API returns failure, alert should be shown.
  */
  test("handles logout failure", async () => {
    window.confirm.mockReturnValue(true);

    //API returns failure
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "Logout failed" }),
    });

    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Logout failed");
    });
  });

  /*
    Test 6:
    If network error happens, catch block should run
    and show error alert.
  */
  test("handles network error during logout", async () => {
    window.confirm.mockReturnValue(true);

    //simulate network crash
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "An error occurred during logout"
      );
    });
  });
});
