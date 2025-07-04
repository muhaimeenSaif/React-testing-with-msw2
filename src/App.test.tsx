// src/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App component", () => {
  render(<App />);
  
  // Test that the App component renders correctly
  const appElement = screen.getByText(/App component/i);
  expect(appElement).toBeInTheDocument();
});