import { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { Carousele, ContactButton, LoanCalulator } from "../Components";

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dataApartments = useContext(context)[0];
  const [apartment, setApartment] = useState(dataApartments[0]);

  const navigate = useNavigate();

  useEffect(() => {
    const postId = Number(id) - 1;

    if (isNaN(postId) || postId < 0 || postId >= dataApartments.length) {
      navigate("/");
      return;
    }

    const newApartment = dataApartments[postId];
    setApartment(newApartment);
  }, [id, dataApartments, navigate]);

  return (
    <div className='container mx-auto p-4'>
      <div className='max-w-4xl mx-auto'>
        <Carousele className=' w-full ' imgs={apartment.images} />

        <h1 className='text-3xl font-bold mt-4'>{apartment.title}</h1>
        <p className='mt-1 text-gray-500'>
          {apartment.city}, {apartment.date}
        </p>
        <p className='mt-4'>{apartment.description}</p>
        <p className='mt-4'>Lokalizacja: {apartment.city}</p>
        <p className='mt-4 font-bold mb-10'>Cena: {apartment.price} zł</p>
        {/*  */}
        <LoanCalulator apartment={apartment} />
        <ContactButton />
      </div>
    </div>
  );
};

export default DetailsPage;
