import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfilePage from "../components/Profile"

//mock useNavigate
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

//suppress console error noise during tests
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

afterAll(() => {
  jest.restoreAllMocks();
});

//redirect if no token
test("redirects to login if no token found", () => {
  localStorage.removeItem("authToken");

  render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );

  expect(mockedNavigate).toHaveBeenCalledWith("/login");
});

//show loading spinner initially
test("shows loading spinner initially", () => {
  localStorage.setItem("authToken", "mock-token");

  fetch.mockResolvedValueOnce(
    new Promise(() => {}) //never resolves to keep loading state
  );

  render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );

  expect(screen.getByText(/loading profile/i)).toBeInTheDocument();
});

//shows profile data on success
test("displays profile data after successful fetch", async () => {
  localStorage.setItem("authToken", "mock-token");

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      user: {
        id: "123",
        email: "test@mail.com",
        full_name: "Test User",
        phone_number: "999999",
        created_at: "2024-01-01T00:00:00.000Z",
      },
    }),
  });

  render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByText(/test@mail.com/i)).toBeInTheDocument()
  );

  expect(screen.getByText(/test user/i)).toBeInTheDocument();
});

//show err if fetch fails
test("shows error message when fetch fails", async () => {
  localStorage.setItem("authToken", "mock-token");

  fetch.mockResolvedValueOnce({
    ok: false,
  });

  render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByText(/could not fetch profile/i)).toBeInTheDocument()
  );
});
