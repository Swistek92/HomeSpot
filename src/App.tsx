import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import Error from "./Pages/Error";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";
import { loader as dropdownLoader } from "./Components/Dropdown";
const routers = (
  <Route
    path='/'
    element={<RootLayout />}
    loader={dropdownLoader}
    errorElement={<Error />}
  >
    <Route index element={<HomePage />} />
    <Route path='/details/:id' index element={<DetailsPage />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routers));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
