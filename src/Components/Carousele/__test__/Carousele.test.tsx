import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Carousele from "../Carousele"; // Adjust the import path as necessary

describe("Carousele Component", () => {
  const mockImgs = [
    "url/to/image1.jpg",
    "url/to/image2.jpg",
    "url/to/image3.jpg",
  ];

  it("should render without crashing", () => {
    render(<Carousele imgs={mockImgs} />);
    expect(screen.getByAltText("Carousel slide")).toBeInTheDocument();
  });

  it("should go to next image on button click", () => {
    render(<Carousele imgs={mockImgs} />);
    const nextButton = screen.getAllByRole("button")[1];
    fireEvent.click(nextButton);
    const imageElement = screen.getByAltText(
      "Carousel slide"
    ) as HTMLImageElement;
    expect(imageElement.src).toContain("image2.jpg");
  });

  it("should go to previous image on button click", () => {
    render(<Carousele imgs={mockImgs} />);
    const previousButton = screen.getAllByRole("button")[0];
    fireEvent.click(previousButton);
    const imageElement = screen.getByAltText(
      "Carousel slide"
    ) as HTMLImageElement;
    expect(imageElement.src).toContain("image3.jpg");
  });

  it("should toggle fullscreen mode on button click", async () => {
    render(<Carousele imgs={mockImgs} />);
    const fullScreenButton = screen.getByText(/pelny ekran/i);
    expect(fullScreenButton.textContent).toContain("pelny ekran");
    Object.defineProperty(document, "fullscreenElement", {
      writable: true,
      value: null,
    });
    document.exitFullscreen = jest.fn();
    HTMLElement.prototype.requestFullscreen = jest.fn(() => Promise.resolve());
    fireEvent.click(fullScreenButton);
    await waitFor(() => {
      expect(fullScreenButton.textContent).toContain("zamknij pełny ekran");
    });
  });
});
