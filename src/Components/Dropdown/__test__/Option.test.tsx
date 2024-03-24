import React from "react";
import { render, screen } from "@testing-library/react";
import Option from "../Option"; // Załóżmy, że ścieżka do twojego komponentu Option jest './Option'

describe("Option Component", () => {
  it("renders the country name and flag correctly", () => {
    const { commonName, flag } = { commonName: "Poland", flag: "🇵🇱" };
    render(<Option index={0} commonName={commonName} flag={flag} />);

    const optionElement = screen.getByText(`${commonName} ${flag}`);

    expect(optionElement).toBeInTheDocument();

    expect(optionElement).toHaveAttribute("value", commonName);
  });
});
