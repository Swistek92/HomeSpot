import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Dropdown from "../Dropdown";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const mockCountries: Country[] = [
  {
    name: {
      common: "Poland",
      official: "Republic of Poland",
      nativeName: {
        pol: {
          official: "Rzeczpospolita Polska",
          common: "Polska",
        },
      },
    },
    tld: [".pl"],
    cca2: "PL",
    ccn3: "616",
    cca3: "POL",
    cioc: "POL",
    independent: true,
    status: "officially-assigned",
    unMember: true,
    currencies: {
      PLN: {
        name: "Polish złoty",
        symbol: "zł",
      },
    },
    idd: {
      root: "+4",
      suffixes: ["8"],
    },
    capital: ["Warsaw"],
    altSpellings: ["PL", "Republic of Poland", "Rzeczpospolita Polska"],
    region: "Europe",
    subregion: "Eastern Europe",
    languages: {
      pol: "Polish",
    },
    translations: {
      pol: {
        official: "Rzeczpospolita Polska",
        common: "Polska",
      },
    },
    latlng: [52.0, 20.0],
    landlocked: false,
    area: 312696,
    demonyms: {
      eng: {
        f: "Polish",
        m: "Polish",
      },
    },
    flag: "🇵🇱",
    maps: {
      googleMaps: "https://www.google.com/maps/place/Poland/",
      openStreetMaps: "https://www.openstreetmap.org/relation/49715",
    },
    population: 37950802,
    gini: {
      "2019": 30.8,
    },
    fifa: "POL",
    car: {
      signs: ["PL"],
      side: "right",
    },
    timezones: ["UTC+1"],
    continents: ["Europe"],
    flags: {
      png: "https://flagcdn.com/w320/pl.png",
      svg: "https://flagcdn.com/pl.svg",
    },
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/pl.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/pl.svg",
    },
    startOfWeek: "monday",
    capitalInfo: {
      latlng: [52.25, 21.0],
    },
    postalCode: {
      format: "##-###",
      regex: "^(\\d{5})$",
    },
  },
];
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
describe("MyComponent", () => {
  it("displays countries", async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Dropdown />,
        loader: () => {
          return { loadedCountries: mockCountries };
        },
      },
    ]);

    render(<RouterProvider router={router} />);
    await waitFor(() => {
      expect(screen.getByText(/Poland\s/)).toBeInTheDocument();
    });
  });

  it("displays error message when countries loading fails", async () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Dropdown />,
        loader: async () => {
          // Rzuć wyjątek z odpowiednią wiadomością błędu
          throw new Error("Failed to load countries");
        },
      },
    ]);

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load countries")).toBeInTheDocument();
    });
  });
});
