import React from "react";
import {
  SortOrder,
  ApartmentsTypes,
  TypeSortOder,
  TypeApartments,
} from "../../Pages/HomePage";

type ApartmentFiltersProps = {
  sortBy: TypeSortOder;
  type: TypeApartments;
  min: number;
  max: number;
  handleChangeSortBy: React.ChangeEventHandler<HTMLSelectElement>;
  handleChangeType: React.ChangeEventHandler<HTMLSelectElement>;
  handleChangeMin: React.ChangeEventHandler<HTMLInputElement>;
  handleChangeMax: React.ChangeEventHandler<HTMLInputElement>;
};

const ApartmentFilters: React.FC<ApartmentFiltersProps> = ({
  sortBy,
  type,
  min,
  max,
  handleChangeSortBy,
  handleChangeType,
  handleChangeMin,
  handleChangeMax,
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4 gap-6'>
      <label htmlFor='sortBy' className='sr-only'>
        Sortuj według
      </label>
      <select
        id='sortBy'
        value={sortBy}
        onChange={handleChangeSortBy}
        className='h-10 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
      >
        <option value={SortOrder.PriceDesc}>Cena malejąco</option>
        <option value={SortOrder.PriceAsc}>Cena rosnąco</option>
        <option value={SortOrder.DateDesc}>Data malejąco</option>
        <option value={SortOrder.DateAsc}>Data rosnąco</option>
      </select>

      <label htmlFor='type' className='sr-only'>
        Typ nieruchomości
      </label>
      <select
        id='type'
        value={type}
        onChange={handleChangeType}
        className='h-10 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
      >
        <option value={ApartmentsTypes.All}>Wszystkie</option>
        <option value={ApartmentsTypes.Flat}>Mieszkania</option>
        <option value={ApartmentsTypes.Home}>Domy</option>
      </select>

      <div>
        <label htmlFor='min' className='sr-only'>
          Cena minimalna
        </label>
        <input
          id='min'
          type='number'
          value={min}
          onChange={handleChangeMin}
          placeholder='Min cena'
          min={10000}
          step={10000}
          className='h-10 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
        />
      </div>

      <div>
        <label htmlFor='max' className='sr-only'>
          Cena maksymalna
        </label>
        <input
          id='max'
          type='number'
          value={max}
          onChange={handleChangeMax}
          placeholder='Max cena'
          min={min + 10000}
          step={10000}
          className='h-10 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
        />
      </div>
    </div>
  );
};

export default ApartmentFilters;
