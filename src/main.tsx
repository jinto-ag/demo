import React from "react";
import ReactDOM from "react-dom/client";
import Root, { loader as rootLoader } from "./routes/root.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/error-pages.tsx";
import CarMakesIndexRoute, {
  loader as carMakesIndexLoader,
} from "./routes/car-makes/index.tsx";
import CarMakesCreateRoute, {
  action as carMakeCreateAction,
} from "./routes/car-makes/create.tsx";
import CarMakesDetailRoute, {
  loader as carMakesDetailLoader,
} from "./routes/car-makes/detail.tsx";
import CarIndexRoute, { loader as carsLoader } from "./routes/cars/index.tsx";
import CarCreateRoute, {
  action as carsCreateAction,
  loader as carsCreateLoader,
} from "./routes/cars/create.tsx";
import CarDetailRoute, {
  loader as carDetailLoader,
} from "./routes/cars/detail.tsx";
import CarMakesEditRoute, {
  action as carMakeEditAction,
  loader as carMakeEditLoader,
} from "./routes/car-makes/edit.tsx";
import CarMakesDeleteRoute, {
  action as carMakeDeleteAction,
} from "./routes/car-makes/delete.tsx";
import CarsEditRoute, {
  action as carsEditAction,
  loader as carsEditLoader,
} from "./routes/cars/edit.tsx";
import CarsDeleteRoute, {
  action as carsDeleteAction,
} from "./routes/cars/delete.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "car-makes",
        element: <CarMakesIndexRoute />,
        loader: carMakesIndexLoader,
        children: [
          {
            path: "create",
            element: <CarMakesCreateRoute />,
            action: carMakeCreateAction,
          },
          {
            path: ":id",
            loader: carMakesDetailLoader,
            element: <CarMakesDetailRoute />,
            children: [
              {
                path: "cars",
                element: <CarIndexRoute />,
                loader: carsLoader,
                children: [
                  {
                    path: "create",
                    element: <CarCreateRoute />,
                    action: carsCreateAction,
                    loader: carsCreateLoader,
                  },
                  {
                    path: ":id",
                    element: <CarDetailRoute />,
                    loader: carDetailLoader,
                    children: [
                      {
                        path: "edit",
                        element: <CarsEditRoute />,
                        loader: carsEditLoader,
                        action: carsEditAction,
                      },
                      {
                        path: "delete",
                        element: <CarsDeleteRoute />,
                        action: carsDeleteAction,
                      },
                    ],
                  },
                ],
              },
              {
                path: "edit",
                element: <CarMakesEditRoute />,
                loader: carMakeEditLoader,
                action: carMakeEditAction,
              },
              {
                path: "delete",
                element: <CarMakesDeleteRoute />,
                action: carMakeDeleteAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
