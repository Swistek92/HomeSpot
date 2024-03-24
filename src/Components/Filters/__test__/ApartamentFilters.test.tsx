import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ApartmentFilters from "../ApartmentFilters";
import { SortOrder, ApartmentsTypes } from "../../../Pages/HomePage";

describe("ApartmentFilters Component", () => {
  let mockHandleChangeSortBy: jest.Mock;
  let mockHandleChangeType: jest.Mock;
  let mockHandleChangeMin: jest.Mock;
  let mockHandleChangeMax: jest.Mock;

  beforeEach(() => {
    mockHandleChangeSortBy = jest.fn();
    mockHandleChangeType = jest.fn();
    mockHandleChangeMin = jest.fn();
    mockHandleChangeMax = jest.fn();
  });

  function renderComponent() {
    return render(
      <ApartmentFilters
        sortBy='DateAsc'
        type={ApartmentsTypes.All}
        min={10000}
        max={100000}
        handleChangeSortBy={mockHandleChangeSortBy}
        handleChangeType={mockHandleChangeType}
        handleChangeMin={mockHandleChangeMin}
        handleChangeMax={mockHandleChangeMax}
      />
    );
  }

  it("renders all form elements correctly", () => {
    renderComponent();
    expect(screen.getByLabelText("Sortuj według")).toBeInTheDocument();
    expect(screen.getByLabelText("Typ nieruchomości")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Min cena")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max cena")).toBeInTheDocument();
  });

  it("calls handleChangeSortBy when the sort order is changed", () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText("Sortuj według"), {
      target: { value: SortOrder.DateAsc },
    });
    expect(mockHandleChangeSortBy).toHaveBeenCalledTimes(1);
  });

  it("calls handleChangeType when the apartment type is changed", () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText("Typ nieruchomości"), {
      target: { value: ApartmentsTypes.Flat },
    });
    expect(mockHandleChangeType).toHaveBeenCalledTimes(1);
  });

  it("calls handleChangeMin when the min price is changed", () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("Min cena"), {
      target: { value: "20000" },
    });
    expect(mockHandleChangeMin).toHaveBeenCalledTimes(1);
  });

  it("calls handleChangeMax when the max price is changed", () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText("Max cena"), {
      target: { value: "200000" },
    });
    expect(mockHandleChangeMax).toHaveBeenCalledTimes(1);
  });
});
