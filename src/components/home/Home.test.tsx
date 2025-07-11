// src/components/Home.test.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "./Home";

// Mock fetch globally
global.fetch = jest.fn();

describe("Home Component", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("renders loading state initially", () => {
    (fetch as jest.Mock).mockImplementation(() => 
      new Promise(() => {}) // Never resolves to keep loading state
    );

    render(<Home />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders API data correctly after successful fetch", async () => {
    const mockData = {
      title: "Test Title",
      body: "Test Body Content"
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Home />);

    // Check for loading state initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the data to be displayed
    await waitFor(() => {
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText("Test Body Content")).toBeInTheDocument();
    });

    // Ensure loading is no longer displayed
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  test("handles API error correctly", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(<Home />);

    // Check for loading state initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/error.*network error/i)).toBeInTheDocument();
    });

    // Ensure loading is no longer displayed
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  test("handles HTTP error status correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/error.*404/i)).toBeInTheDocument();
    });
  });

  test("toggles sidebar correctly", async () => {
    const mockData = {
      title: "Test Title",
      body: "Test Body Content"
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Home />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    const toggleButton = screen.getByText("Open Menu");
    expect(toggleButton).toBeInTheDocument();

    // Click to open sidebar
    fireEvent.click(toggleButton);
    expect(screen.getByText("Close Menu")).toBeInTheDocument();

    // Click to close sidebar
    fireEvent.click(screen.getByText("Close Menu"));
    expect(screen.getByText("Open Menu")).toBeInTheDocument();
  });

  test("renders navigation button and user info", async () => {
    const mockData = {
      title: "Test Title",
      body: "Test Body Content"
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    // Check for navigation button
    expect(screen.getByText("Go To User Search")).toBeInTheDocument();
    
    // Check for user info in sidebar
    expect(screen.getByText("User: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("calls correct API endpoint", async () => {
    const mockData = { title: "Test", body: "Test Body" };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Home />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts/1");
    });
  });
});