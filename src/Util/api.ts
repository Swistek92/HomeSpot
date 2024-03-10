import { CustomError } from "./costomError";

export const getCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  console.log(response);
  if (!response.ok) {
    throw new CustomError("something went wrong", 404);
  }
  return response.json();
};
