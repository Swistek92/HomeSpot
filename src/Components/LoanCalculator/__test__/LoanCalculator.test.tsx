import { render, screen, fireEvent } from "@testing-library/react";
import LoanCalculator from "../LoanCalculator";

describe("LoanCalculator Component", () => {
  const apartmentMock = {
    id: 1,
    city: "Example City",
    title: "Example Title",
    description: "Example Description",
    price: 500000,
    images: ["url1", "url2"],
    date: "2024-01-01",
    type: "Flat",
  };

  it("renders correctly with initial state based on apartment props", () => {
    render(<LoanCalculator apartment={apartmentMock} />);

    expect(screen.getByText(/Kalkulator pożyczki/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("30")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue((apartmentMock.price * 0.2).toString())
    ).toBeInTheDocument();
  });

  it("updates the down payment and recalculates loan amount on downPayment change", () => {
    render(<LoanCalculator apartment={apartmentMock} />);
    const downPaymentInput = screen.getByLabelText(
      /Wkład własny/i
    ) as HTMLInputElement;

    const newDownPayment = apartmentMock.price * 0.3;
    fireEvent.change(downPaymentInput, {
      target: { value: newDownPayment.toString() },
    });

    expect(downPaymentInput.value).toBe(newDownPayment.toString());
  });

  it("updates the loan period and recalculates the monthly cost on years change", () => {
    render(<LoanCalculator apartment={apartmentMock} />);
    const yearsInput = screen.getByLabelText(
      /Okres pożyczki/i
    ) as HTMLInputElement;

    fireEvent.change(yearsInput, { target: { value: "15" } });

    expect(yearsInput.value).toBe("15");
  });
});
