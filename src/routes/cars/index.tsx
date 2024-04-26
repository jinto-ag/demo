import {
  Outlet,
  json,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { db } from "../../data/db";

export async function loader({ request }: LoaderFunctionArgs) {
  const cars = await db.cars.toArray();
  return json({ cars });
}

const CarIndexRoute = () => {
  const { cars } = useLoaderData() as typeof loader;
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default CarIndexRoute;
