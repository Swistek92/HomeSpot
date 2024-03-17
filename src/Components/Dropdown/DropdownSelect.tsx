import Option from "./Option";

const DropdownSelect = ({ countries }: { countries: Country[] }) => {
  return (
    <select className='block w-full mt-1 bg-gray-300 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'>
      {countries.map((country, index) => (
        <Option
          index={index}
          commonName={country.name.common}
          flag={country.flag}
        />
      ))}
    </select>
  );
};

export default DropdownSelect;
