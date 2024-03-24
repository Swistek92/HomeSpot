import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Apartment from "../Apartment"; // Asumując, że ścieżka do importu jest poprawna

const randomApartment = {
  id: 7609,
  city: "Warsaw",
  title: "Modern Apartment in the Heart of the City",
  description:
    "A spacious and modern apartment located in the center of Warsaw, close to all amenities and public transport. Perfect for both short and long stays.",
  price: 1969,
  images: ["https://example.com/image1.jpg"],
  date: "2024-03-18",
  type: "apartment",
};

describe("Apartment Component", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Apartment apartment={randomApartment} />
      </BrowserRouter>
    );

  test("renders apartment information correctly", () => {
    renderComponent();
    expect(screen.getByText(randomApartment.title)).toBeInTheDocument();
    expect(screen.getByText(randomApartment.description)).toBeInTheDocument();
    expect(screen.getByText(`${randomApartment.price} zł`)).toBeInTheDocument();
    expect(screen.getByText(randomApartment.city)).toBeInTheDocument();
    expect(
      screen.getByText(`Typ: ${randomApartment.type}`)
    ).toBeInTheDocument();
  });

  test("renders main image and city herb image", () => {
    renderComponent();
    expect(screen.getByAltText(randomApartment.title)).toHaveAttribute(
      "src",
      randomApartment.images[0]
    );
    expect(
      screen.getByAltText(`Herb miasta ${randomApartment.city}`)
    ).toBeInTheDocument();
  });

  test("NavLink navigates to the correct apartment details page", () => {
    renderComponent();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/details/${randomApartment.id}`
    );
  });
});
