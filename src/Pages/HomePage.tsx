import data from "../Util/data.json";
import {
  katowice,
  krakow,
  poznan,
  polska,
  warszawa,
  wroclaw,
} from "../Assets/herb";
import { useState } from "react";

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

  const apartaments: Home[] = filterApartaments(data);
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
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4  '>
        {apartaments.map((home, index) => (
          <div
            key={home.id}
            className={`border-y-2 border-gray-600 p-4 md: py-3 `}
          >
            <h2 className='text-lg font-semibold'>{home.title}</h2>
            <p className='text-sm text-gray-600'>{home.city}</p>
            <p className='text-sm text-gray-600'>
              {" "}
              oglszenie dostepne od: {home.date}
            </p>

            <p className='mt-2'>{home.description}</p>
            <p className='mt-2 font-semibold'>{home.price} zł</p>

            <div className='relative mt-4'>
              <img
                src={home.image}
                alt={home.title}
                className='rounded-lg w-full h-48 object-cover'
              />
              <img
                src={getHerbImage(home.city)}
                alt={`Herb miasta ${home.city}`}
                className='absolute top-0 right-0 m-2 max-h-12'
              />
            </div>
          </div>
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
