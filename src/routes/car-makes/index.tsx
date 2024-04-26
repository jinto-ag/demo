import {
  Outlet,
  json,
  useActionData,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import CarModelItem from "../../components/car-model-item";
import { db } from "../../data/db";
import { action } from "./create";

export async function loader({ request }: LoaderFunctionArgs) {
  const cars = await db.cars.toArray();
  const carsWithDetails = await Promise.all(
    cars.map(async (car) => ({
      ...car,
      make: await db.carMakes.get(car.makeId),
      bodyType: await db.bodyTypes.get(car.bodyTypeId),
      transmissionModel: await db.transmissionModels.get(
        car.transmissionModelId
      ),
      engineCapacity: await db.engineCapacities.get(car.engineCapacityId),
    }))
  );

  return json({ cars: carsWithDetails });
}

const CarMakesIndexRoute = () => {
  const { cars } = useLoaderData() as typeof loader;
  const carMakeActionData = useActionData() as typeof action;

  return (
    <div className="flex flex-auto gap-4 flex-wrap">
      <div className="flex flex-col flex-auto gap-4">
        <Outlet />
      </div>
      <div className="flex flex-col flex-auto gap-4">
        <h4 className="text-h4">Models</h4>
        <p>The models that you've already added under the make </p>
        <ul className="flex flex-col gap-4">
          {cars.length > 0 ? (
            cars.map((car, i) => (
              <li key={`car-key-${car.id}-${i}`}>
                <CarModelItem car={car} />
              </li>
            ))
          ) : (
            <li>No cars found!</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CarMakesIndexRoute;
