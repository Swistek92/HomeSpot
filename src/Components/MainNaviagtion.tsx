import { NavLink } from "react-router-dom";
import logo from "../Assets/logo.jpg";
import Dropdown from "./Dropdown";
function MainNavigation() {
  return (
    <header className='flex  justify-between items-center py-5 sticky top-0  bg-gray-500 border-b-2 z-50 '>
      <nav className='flex-grow'>
        <ul className='flex gap-8 justify-between'>
          <li className='m-auto'>
            <Dropdown />
          </li>
          <li className='mr-5 '>
            <NavLink to='/'>
              <img
                src={logo}
                alt='Logo'
                className='max-h-10 rounded-xl transform hover:scale-105 transition-transform duration-200 md:max-h-24'
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
