import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import Error from "./Pages/Error";
import HomePage from "./Pages/HomePage";
import DetailsPage from "./Pages/DetailsPage";
import { loader as dropdownLoader } from "./Components/Dropdown";
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";

const routers = (
  <Route
    path='/'
    element={<RootLayout />}
    loader={dropdownLoader}
    errorElement={<Error />}
  >
    <Route index element={<HomePage />} /> /
    <Route path='details/:id' element={<DetailsPage />} />
    <Route path='blog' element={<Blog />} />
    <Route path='blog/:id' element={<BlogPost />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routers));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
