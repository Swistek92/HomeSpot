import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Carousele from "../Components/Carousele";

const DetailsPage = () => {
  const { id } = useParams();

  const dataHomes = useContext(context)[0];
  const [home, setHome] = useState(dataHomes[0]);
  const [downPayment, setDownPayment] = useState(home.price * 0.2);
  const [loanAmount, setLoanAmount] = useState(home.price - downPayment);
  const [years, setYears] = useState(30);
  const [costMonstly, setCostMonty] = useState(0);
  const navigate = useNavigate();
  const minDownPayment = home.price * 0.2;
  const maxDownPayment = home.price * 0.8;
  const stepDownPayment = home.price * 0.05;

  useEffect(() => {
    const postId = Number(id) - 1;

    if (isNaN(postId) || postId < 0 || postId >= dataHomes.length) {
      navigate("/");
      return;
    }

    const newHome = dataHomes[postId];
    setHome(newHome);
    const initialDownPayment = newHome.price * 0.2;
    setDownPayment(initialDownPayment);
    setLoanAmount(newHome.price - initialDownPayment);
    setYears(30);
    calculateLoan();
  }, [id, dataHomes, navigate]);

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
    const dp = Math.max(value, home.price * 0.2);
    setDownPayment(dp);
    setLoanAmount(home.price - dp);
    calculateLoan();
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='max-w-4xl mx-auto'>
        {/* <div className='w-full h-80'></div> */}
        <Carousele className=' w-full ' imgs={home.images} />

        <h1 className='text-3xl font-bold mt-4'>{home.title}</h1>
        <p className='mt-1 text-gray-500'>
          {home.city}, {home.date}
        </p>
        <p className='mt-4'>{home.description}</p>
        <p className='mt-4'>Lokalizacja: {home.city}</p>
        <p className='mt-4 font-bold'>Cena: {home.price} zł</p>

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
              onChange={(e) =>
                handleDownPaymentChange(parseFloat(e.target.value))
              }
              className='w-full cursor-pointer'
            />
            <div className='text-center text-gray-700'>
              {((downPayment / home.price) * 100).toFixed(2)}%
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
          <NavLink
            to={
              "https://wa.me/000000000000?text=Cześć!%20Chciałbym%20się%20dowiedzieć%20więcej%20o%20Twoich%20usługach"
            }
            target='_blank'
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'
          >
            Kontakt do naszego Agenta
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
