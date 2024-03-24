import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainNavigation from "../MainNavigation";

jest.mock("../../", () => ({
  Dropdown: jest.fn(() => <div>MockDropdown</div>),
}));

jest.mock("../../../Assets", () => ({
  logo: "test-logo-url",
}));

describe("MainNavigation", () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <MainNavigation />
      </BrowserRouter>
    );

  it("should render without crashing", () => {
    setup();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Home Spot")).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("should have the correct link paths", () => {
    setup();
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog"
    );
    expect(screen.getByRole("link", { name: /Home Spot/i })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("should display the logo correctly", () => {
    setup();
    const logoImg = screen.getByAltText("Logo");
    expect(logoImg).toHaveAttribute("src", "test-logo-url");
    expect(logoImg).toHaveClass("max-h-10");
  });

});
