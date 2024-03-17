import { useContext, useState } from "react";
import { context } from "../App";
import { ApartmentFilters, Apartment } from "../Components";

export const SortOrder = {
  PriceDesc: "price_desc",
  PriceAsc: "price_asc",
  DateDesc: "date_desc",
  DateAsc: "date_asc",
} as const;

export const ApartmentsTypes = {
  Flat: "mieszkanie",
  Home: "dom",
  All: "All",
} as const;

export type TypeSortOder = keyof typeof SortOrder;
export type TypeApartments = keyof typeof ApartmentsTypes;

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
  const dataAdvertisement: Apartment[] = useContext(context)[0];

  /////
  const filterApartments = (apartment: Apartment[]): Apartment[] => {
    let filtered = apartment;
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

  const Apartments: Apartment[] = filterApartments(dataAdvertisement);
  /////
  const handleChangeSortBy: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortBy(e.target.value as TypeSortOder);
  };

  const handleChangeType: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setType(e.target.value as TypeApartments);
  };

  const handleChangeMin: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setMin(parseInt(e.target.value));

  const handleChangeMax: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setMax(parseInt(e.target.value));

  return (
    <div>
      <ApartmentFilters
        sortBy={sortBy}
        type={type}
        min={min}
        max={max}
        handleChangeMax={handleChangeMax}
        handleChangeMin={handleChangeMin}
        handleChangeSortBy={handleChangeSortBy}
        handleChangeType={handleChangeType}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4  '>
        {Apartments.length === 0 ? (
          <div>
            <h1>niestety zadne ogloszenie nie spełnia Twoich założeń</h1>
          </div>
        ) : (
          Apartments.map((apartment: Apartment) => (
            <Apartment apartment={apartment} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
