import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import React from "react";
import { dataAdvertisement, dataArticles } from "./Util";
import {
  Blog,
  BlogPost,
  DetailsPage,
  Error,
  RootLayout,
  HomePage,
} from "./Pages";
import { dropdownLoader } from "./Components";

const globalData: GlobalData = [dataAdvertisement, dataArticles];

export const context = React.createContext(globalData);

const routers = (
  <Route
    path='/'
    element={<RootLayout />}
    loader={dropdownLoader}
    errorElement={<Error />}
  >
    <Route index element={<HomePage />} />
    <Route path='details/:id' element={<DetailsPage />} />
    <Route path='blog' element={<Blog />} />
    <Route path='blog/:id' element={<BlogPost />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routers));

function App() {
  return (
    <context.Provider value={globalData}>
      <RouterProvider router={router} />
    </context.Provider>
  );
}

export default App;
