import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders API data correctly", async () => {
  render(<App />);

  // Check for loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for the mocked data to be displayed
  const title = await screen.findByText("Mocked Title");
  const body = screen.getByText("This is a mocked body for the API response.");

  // Assert that the mocked data is rendered
  expect(title).toBeInTheDocument();
  expect(body).toBeInTheDocument();
});

test("handles API error correctly", async () => {
  // Override the default handler to return an error
  render(<App />);

  // Check for loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for the error message to be displayed
  const error = await screen.findByText(/error/i);
  expect(error).toBeInTheDocument();
});
