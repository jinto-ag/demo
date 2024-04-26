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
import { CarMakeSchema } from "../../data/schema";
import { getBase64 } from "../../lib/utils";

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (params.id) {
    const carMake = await db.carMakes.get(Number.parseInt(params.id));
    return json({ carMake });
  }
  return json({ carMake: undefined });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: CarMakeSchema });
  if (submission.status !== "success") {
    return json(
      {
        result: submission.reply(),
      },
      { status: 400 }
    );
  }
  const logo = await getBase64(submission.value.logo);
  const carMake = {
    ...submission.value,
    logo,
  };

  if (params.id) {
    await db.carMakes.update(params.id, carMake);
    //   return json({ result: { ...submission.value, id: carMakeId }, status: 200 });
    return redirect(`../${params.id}/cars/create`);
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

const CarMakesEditRoute = () => {
  const { carMake } = useLoaderData() as typeof loader;
  return (
    <div className="flex flex-col gap-4">
      <CarMakeEditForm initialValue={carMake} />
    </div>
  );
};

export default CarMakesEditRoute;
