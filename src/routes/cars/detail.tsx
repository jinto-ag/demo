import { json, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import { db } from "../../data/db";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id) {
    const car = await db.cars.get(params.id);
    return json({ cars: car });
  }

  return json({ car: undefined });
}

const CarDetailRoute = () => {
  const { car } = useLoaderData() as typeof loader;
  return <div>{car?.modelName}</div>;
};

export default CarDetailRoute;
