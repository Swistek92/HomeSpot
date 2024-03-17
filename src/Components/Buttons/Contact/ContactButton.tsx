import React from "react";
import { NavLink } from "react-router-dom";

const ContactButton = () => {
  return (
    <NavLink
      to={
        "https://wa.me/000000000000?text=Cześć!%20Chciałbym%20się%20dowiedzieć%20więcej%20o%20Twoich%20usługach"
      }
      target='_blank'
      className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded pt-2'
    >
      Kontakt do naszego Agenta
    </NavLink>
  );
};

export default ContactButton;
