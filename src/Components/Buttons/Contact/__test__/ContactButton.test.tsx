import React from "react";
import { BrowserRouter } from "react-router-dom"; // Potrzebny do obsługi <NavLink>
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactButton from "../ContactButton"; // Dostosuj ścieżkę do Twojej struktury projektu

describe("ContactButton Component", () => {
  test("renders correctly with correct link and text", () => {
    render(
      <BrowserRouter>
        <ContactButton />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole("link", {
      name: /Kontakt do naszego Agenta/i,
    });

    expect(linkElement).toHaveAttribute(
      "href",
      "https://wa.me/000000000000?text=Cześć!%20Chciałbym%20się%20dowiedzieć%20więcej%20o%20Twoich%20usługach"
    );

    expect(linkElement).toHaveAttribute("target", "_blank");
  });
});
