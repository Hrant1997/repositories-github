import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAppDispatch } from "../redux/repositories";
import Root from "./root";
import ErrorPage from "../error-page";
import Home from "./home";
import { loader as homeLoader } from './helpers/home'
import { loader as repositoryLoader } from './helpers/repository'
import Repository from "./repository";

const Router = () => {
  const dispatch = useAppDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: (loaderParams) => homeLoader(dispatch, loaderParams)
        },
        {
          path: "repositories/:repositoryId",
          element: <Repository />,
          loader: (loaderParams) => repositoryLoader(dispatch, loaderParams)
        },
      ]
    },
  ]);

  return <RouterProvider router={router} />
}

export default Router;