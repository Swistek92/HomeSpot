import React from "react";

const Option = ({
  index,
  commonName,
  flag,
}: {
  index: number;
  commonName: string;
  flag: string;
}) => {
  return (
    <option
      key={index}
      value={commonName}
      className='py-2 px-4 hover:bg-gray-100'
    >
      {commonName} {flag}
    </option>
  );
};

export default Option;
