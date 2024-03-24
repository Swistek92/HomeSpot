import React from "react";
import { BrowserRouter } from "react-router-dom"; // Należy zaimportować, gdy używamy NavLink
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Article from "../Article"; // Załóżmy, że ścieżka do komponentu Article jest prawidłowa

describe("Article Component", () => {
  const articleProps = {
    id: 1,
    title: "Test Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    images: ["https://picsum.photos/seed/1/600/400"],
  };

  test("renders Article with shortened content and a valid link", () => {
    render(
      <BrowserRouter>
        <Article {...articleProps} />
      </BrowserRouter>
    );

    const titleElement = screen.getByText(articleProps.title);
    expect(titleElement).toBeInTheDocument();

    const contentElement = screen.getByText((content) =>
      content.startsWith(articleProps.content.substring(0, 10))
    );
    expect(contentElement).toBeInTheDocument();

    const imageElement = screen.getByAltText(
      `article about ${articleProps.title}`
    );
    expect(imageElement).toHaveAttribute(
      "src",
      `https://picsum.photos/seed/${articleProps.id}/600/400`
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/blog/${articleProps.id}`);
  });
});
