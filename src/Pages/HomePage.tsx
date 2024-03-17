import { NavLink } from "react-router-dom";

import {
  katowice,
  krakow,
  poznan,
  polska,
  warszawa,
  wroclaw,
} from "../Assets/herb";
import { useContext, useState } from "react";
import { context } from "../App";
import data from "../Util/dataAdvertisement.json";
const Herbs: Herbs = {
  default: polska,
  kraków: krakow,
  katowice: katowice,
  poznań: poznan,
  warszawa: warszawa,
  wrocław: wroclaw,
} as const;

const SortOrder = {
  PriceDesc: "price_desc",
  PriceAsc: "price_asc",
  DateDesc: "date_desc",
  DateAsc: "date_asc",
} as const;
const Apartments = {
  Flat: "mieszkanie",
  Home: "dom",
  All: "All",
} as const;
type TypeSortOder = keyof typeof SortOrder;
type TypeApartments = keyof typeof Apartments;

const getHerbImage = (cityName: string) =>
  Herbs[cityName.toLowerCase()] || Herbs.default;

const sortFunctions: { [key: string]: SortFunction } = {
  price_desc: (a, b) => b.price - a.price,
  price_asc: (a, b) => a.price - b.price,
  date_desc: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  date_asc: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
} as const;

const HomePage = () => {
  /////
  const [sortBy, setSortBy] = useState<TypeSortOder>("DateAsc");
  const [type, setType] = useState<TypeApartments>("All");
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const dataAdvertisement = useContext(context)[0];

  /////
  const filterApartaments = (apartments: Home[]): Home[] => {
    let filtered = apartments;
    if (type !== "All") {
      filtered = filtered.filter((e) => e.type.toLocaleLowerCase() === type);
    }
    if (min > 10000) {
      filtered = filtered.filter((e) => e.price >= min);
    }
    if (max > min) {
      filtered = filtered.filter((e) => e.price <= max);
    }

    return filtered.slice().sort(sortFunctions[sortBy]);
  };

  const apartaments: Home[] = filterApartaments(dataAdvertisement);
  /////
  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as TypeSortOder);
  };
  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as TypeApartments);
  };
  const handleChangeMin = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMin(parseInt(e.target.value));
  const handleChangeMax = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMax(parseInt(e.target.value));
  /////
  return (
    <div>
      {/* filters */}
      <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4 gap-4'>
        <select
          value={sortBy}
          onChange={handleChangeSortBy}
          className='h-10 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
        >
          <option value={SortOrder.PriceDesc}>Cena malejąco</option>
          <option value={SortOrder.PriceAsc}>Cena rosnąco</option>
          <option value={SortOrder.DateDesc}>Data malejąco</option>
          <option value={SortOrder.DateAsc}>Data rosnąco</option>
        </select>
        <select
          value={type}
          onChange={handleChangeType}
          className='h-10 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
        >
          <option value={Apartments.All}>Wszystkie</option>
          <option value={Apartments.Flat}>Mieszkania</option>{" "}
          <option value={Apartments.Home}>Domy</option>
        </select>
        <input
          type='number'
          value={min}
          onChange={handleChangeMin}
          placeholder='Min cena'
          min={10000}
          step={10000}
          className='h-10 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
        />
        <input
          type='number'
          value={max}
          onChange={handleChangeMax}
          placeholder='Max cena'
          min={min + 10000}
          step={10000}
          className='h-10 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
        />
      </div>
      {/* grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4  '>
        {apartaments.map((home, index) => (
          <NavLink
            to={`/details/${home.id}`}
            className='max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white hover:bg-gray-100 transition-colors duration-200 ease-in-out'
          >
            <div className='relative w-full h-48 '>
              <img
                src={home.images[0]}
                alt={home.title}
                className='rounded-lg w-full h-48 object-cover'
              />
              <img
                src={getHerbImage(home.city)}
                alt={`Herb miasta ${home.city}`}
                className='absolute top-0 right-0 m-2 max-h-12'
              />
            </div>
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{home.title}</div>
              <p className='text-gray-700 text-base'>{home.description}</p>
            </div>
            <div className='px-6 pt-4 pb-2'>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                {home.city}
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                {home.price} zł
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
                Typ: {home.type}
              </span>
            </div>
          </NavLink>
        ))}
        {apartaments.length === 0 && (
          <div>
            <h1>niestety zadne ogloszenie nie spełnia Twoich założeń</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
