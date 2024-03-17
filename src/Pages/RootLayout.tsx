import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation/MainNaviagtion";

const RootLayout = () => {
  return (
    <div className='bg-gray-500 min-h-screen w-full'>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
