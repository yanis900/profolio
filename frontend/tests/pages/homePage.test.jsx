import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { HomePage } from "../../src/pages/Home/HomePage";

describe("Home Page", () => {
  test("welcomes you to the site", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading");
    expect(heading.textContent).toEqual("Welcome to Profolio!");
  });

  test("Displays a signup link", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const signupLinks = screen.getAllByText("Sign Up");
    const signupLink = signupLinks.find(link => link.getAttribute("href") === "/signup");
    expect(signupLink).toBeTruthy();
    expect(signupLink.getAttribute("href")).toEqual("/signup");
  });

  test("Displays a login link", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const loginLinks = screen.getAllByText("Log In");
    const loginLink = loginLinks.find(link => link.getAttribute("href") === "/login");
    expect(loginLink).toBeTruthy();
    expect(loginLink.getAttribute("href")).toEqual("/login");
  });
});
