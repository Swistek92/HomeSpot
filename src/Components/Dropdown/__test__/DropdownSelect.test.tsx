import React from "react";
import { render, screen, within } from "@testing-library/react";
import DropdownSelect from "../DropdownSelect"; // Dostosuj ścieżkę do twojego komponentu

// Przykładowe dane countries
const mockCountries = [
  { name: { common: "Poland" }, flag: "🇵🇱" },
  { name: { common: "Germany" }, flag: "🇩🇪" },
  { name: { common: "Spain" }, flag: "🇪🇸" },
] as Country[];

describe("DropdownSelect Component", () => {
  it("renders all countries options correctly", () => {
    render(<DropdownSelect countries={mockCountries} />);

    expect(screen.getByText(/Poland\s/)).toBeInTheDocument();
    expect(screen.getByText(/Germany\s/)).toBeInTheDocument();
    expect(screen.getByText(/Spain\s/)).toBeInTheDocument();
  });

  it("contains the correct number of options", () => {
    render(<DropdownSelect countries={mockCountries} />);

    const selectElement = screen.getByRole("combobox");
    const options = within(selectElement).getAllByRole("option");
    expect(options).toHaveLength(mockCountries.length);
  });
});
