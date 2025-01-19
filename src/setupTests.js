// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

// Set up the MSW server with defined handlers
const server = setupServer(...handlers);

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset handlers after each test to ensure test isolation
afterEach(() => server.resetHandlers());

// Clean up after tests are done
afterAll(() => server.close());
