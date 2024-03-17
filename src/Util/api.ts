import { CustomError } from "./costomError";

type GetCountryResponse = Country[];

export const getCountries = async (): Promise<GetCountryResponse> => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  if (!response.ok) {
    throw new CustomError("something went wrong", 404);
  }

  const countries: GetCountryResponse = await response.json();

  return countries;
};
