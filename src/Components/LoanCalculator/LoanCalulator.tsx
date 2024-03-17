import React, { useEffect, useState } from "react";

const LoanCalulator: React.FC<{ apartment: Apartment }> = ({ apartment }) => {
  const [downPayment, setDownPayment] = useState(apartment.price * 0.2);
  const [loanAmount, setLoanAmount] = useState(apartment.price - downPayment);
  const [years, setYears] = useState(30);
  const [costMonstly, setCostMonty] = useState(0);

  const minDownPayment = apartment.price * 0.2;
  const maxDownPayment = apartment.price * 0.8;
  const stepDownPayment = apartment.price * 0.05;

  useEffect(() => {
    setDownPayment(minDownPayment);
    setLoanAmount(apartment.price - minDownPayment);
    setYears(30);
    calculateLoan();
  }, [apartment]);

  const calculateLoan = () => {
    const baseInterestRate = 3;
    const monthlyInterestRate = baseInterestRate / 1200;
    const numberOfMonths = years * 12;
    const monthlyPayment =
      loanAmount *
      (monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths)));
    setCostMonty(monthlyPayment);
  };

  const handleDownPaymentChange = (value: number) => {
    const dp = Math.max(value, apartment.price * 0.2);
    setDownPayment(dp);
    setLoanAmount(apartment.price - dp);
    calculateLoan();
  };

  return (
    <div className='mt-6'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>
        Kalkulator pożyczki
      </h1>

      <div className='mb-4'>
        <label
          htmlFor='downPaymentRange'
          className='block text-gray-700 text-sm font-bold mb-2'
        >
          Wkład własny (% ceny domu):
        </label>
        <input
          type='range'
          id='downPaymentRange'
          value={downPayment}
          min={minDownPayment}
          max={maxDownPayment}
          step={stepDownPayment}
          onChange={(e) => handleDownPaymentChange(parseFloat(e.target.value))}
          className='w-full cursor-pointer'
        />
        <div className='text-center text-gray-700'>
          {((downPayment / apartment.price) * 100).toFixed(2)}%
        </div>
      </div>

      <div className='mb-4'>
        <label
          htmlFor='years'
          className='block text-gray-700 text-sm font-bold mb-2'
        >
          Okres pożyczki (Lata):
        </label>
        <input
          type='range'
          id='years'
          value={years}
          onChange={(e) => {
            setYears(parseInt(e.target.value));
            calculateLoan();
          }}
          className='w-full cursor-pointer'
          min='5'
          max='30'
        />
        <div className='text-center text-gray-700'>{years} lat(a)</div>
      </div>

      <div className='mb-4 text-center font-semibold'>
        Koszta miesięczne: {costMonstly.toFixed(2)} zł
      </div>
    </div>
  );
};

export default LoanCalulator;
