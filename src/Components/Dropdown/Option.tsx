import React from "react";

type OptionProps = {
  index: number;
  commonName: string;
  flag: string;
};

const Option: React.FC<OptionProps> = ({ index, commonName, flag }) => {
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
