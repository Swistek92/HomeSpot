import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getCountries } from "../../Util/api";
import DropdownSelect from "./DropdownSelect";

const Dropdown: React.FC = () => {
  const loadedData = useLoaderData() as LoadedData;
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
