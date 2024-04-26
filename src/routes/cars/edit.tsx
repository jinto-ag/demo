import { parseWithZod } from "@conform-to/zod";

import {
  json,
  redirect,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router-dom";
import CarMakeEditForm from "../../components/car-make-edit-form";
import { db } from "../../data/db";
import { CarSchema } from "../../data/schema";
import CarEditForm from "../../components/car-edit-form";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const bodyTypes = await db.bodyTypes.toArray();
  const transmissionModels = await db.transmissionModels.toArray();
  const engineCapacities = await db.engineCapacities.toArray();

  if (params.id) {
    const car = await db.cars.get(Number.parseInt(params.id));
    return json({ car, bodyTypes, transmissionModels, engineCapacities });
  }

  return json({
    car: undefined,
    bodyTypes,
    transmissionModels,
    engineCapacities,
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: CarSchema });
  if (submission.status !== "success") {
    return json(
      {
        result: submission.reply(),
      },
      { status: 400 }
    );
  }

  if (params.id) {
    await db.cars.update(params.id, submission.value);
    //   return json({ result: { ...submission.value, id: carMakeId }, status: 200 });
    return redirect(`..`);
  }

  return json(
    {
      result: {
        ...submission.reply(),
        error: { message: "Something went wrong" },
      },
    },
    { status: 400, statusText: "Can't update car make" }
  );
}

const CarsEditRoute = () => {
  const { car } = useLoaderData() as typeof loader;

  return (
    <div className="flex flex-col gap-4">
      <CarEditForm initialValue={car} />
    </div>
  );
};

export default CarsEditRoute;
