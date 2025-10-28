import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// 1. Import 'vi' and 'vi.mocked'
import { vi, describe, test, expect, beforeEach, afterEach } from "vitest";

// 2. Import the *real* services you want to mock
import { login } from "../../src/services/authentication";
import { getUserByEmail } from "../../src/services/user";

import { LoginPage } from "../../src/pages/Login/LoginPage";

// 3. Define the navigate mock (this one is different)
const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => ({ userSlug: "mock-test-slug" }),
  };
});

// 4. Auto-mock the service files.
// This tells Vitest to replace all exports with vi.fn()
vi.mock("../../src/services/authentication");
vi.mock("../../src/services/user");

// Reusable function for filling out login form
async function completeLoginForm() {
  const user = userEvent.setup();
  const emailInputEl = screen.getByLabelText("Email");
  const passwordInputEl = screen.getByLabelText("Password");
  const submitButtonEl = screen.getByRole("submit-button");
  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.click(submitButtonEl);
}

describe("Login Page", () => {
  beforeEach(() => {
    // 5. Use vi.restoreAllMocks() to clear mocks between tests
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  test("allows a user to login", async () => {
    render(<LoginPage />);
    
    // 6. Use vi.mocked() to get the auto-mocked function
    vi.mocked(getUserByEmail).mockResolvedValue({ 
      user: { firstname: "test", lastname: "user", _id: "abc123456" } 
    });

    await completeLoginForm();
    
    // 7. Use vi.mocked() to check the call
    expect(vi.mocked(login)).toHaveBeenCalledWith("test@email.com", "1234");
  });

  test("navigates to dynamic portfolio slug on successful login", async () => {
    render(<LoginPage />);

    vi.mocked(login).mockResolvedValue("secrettoken123");
    
    vi.mocked(getUserByEmail).mockResolvedValue({
      user: {
        firstname: "test",
        lastname: "user",
        _id: "a-very-long-id-string-123456"
      }
    });
    
    await completeLoginForm();

    const expectedSlug = "/portfolio/test-user-123456";
    expect(navigateMock).toHaveBeenCalledWith(expectedSlug);
  });

  test("navigates to /login on unsuccessful login", async () => {
    render(<LoginPage />);
    
    vi.mocked(login).mockRejectedValue(new Error("Error logging in"));
    
    await completeLoginForm();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});