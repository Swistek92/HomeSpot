import React from "react";
import { NavLink } from "react-router-dom";
import { Herbs as HerbsIcons } from "../../Assets";

const Herbs: Herbs = {
  default: HerbsIcons.polska,
  kraków: HerbsIcons.krakow,
  katowice: HerbsIcons.katowice,
  poznań: HerbsIcons.poznan,
  warszawa: HerbsIcons.warszawa,
  wrocław: HerbsIcons.wroclaw,
} as const;

const Apartment: React.FC<{ apartment: Apartment }> = ({ apartment }) => {
  const getHerbImage = (cityName: string) =>
    Herbs[cityName.toLowerCase()] || Herbs.default;

  return (
    <NavLink
      to={`/details/${apartment.id}`}
      className='max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white hover:bg-gray-100 transition-colors duration-200 ease-in-out'
    >
      <div className='relative w-full h-48 '>
        <img
          src={apartment.images[0]}
          alt={apartment.title}
          className='rounded-lg w-full h-48 object-cover'
        />
        <img
          src={getHerbImage(apartment.city)}
          alt={`Herb miasta ${apartment.city}`}
          className='absolute top-0 right-0 m-2 max-h-12'
        />
      </div>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{apartment.title}</div>
        <p className='text-gray-700 text-base'>{apartment.description}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          {apartment.city}
        </span>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          {apartment.price} zł
        </span>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
          Typ: {apartment.type}
        </span>
      </div>
    </NavLink>
  );
};

export default Apartment;
