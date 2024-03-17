import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getCountries } from "../Util/api";

const DropdownSelect = ({ countries }: { countries: Country[] }) => {
  return (
    <select className='block w-full mt-1 bg-gray-300 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'>
      {countries.map((country, index) => (
        <option
          key={index}
          value={country.name.common}
          className='py-2 px-4 hover:bg-gray-100'
        >
          {country.name.common} {country.flag}
        </option>
      ))}
    </select>
  );
};

const Dropdown = () => {
  const loadedData = useLoaderData() as LoadedData;
  console.log(loadedData);
  return (
    <>
      <Suspense fallback={<p>loading...</p>}>
        <Await
          resolve={loadedData.loadedCountries}
          errorElement={<p>error loading blog post</p>}
        >
          {(loadedData: Country[]) => <DropdownSelect countries={loadedData} />}
        </Await>
      </Suspense>
    </>
  );
};

export default Dropdown;

export const loader = () => {
  return defer({ loadedCountries: getCountries() });
};
