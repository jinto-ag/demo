import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";
import NewMakeForm from "../../components/new-make-form";
import { db } from "../../data/db";
import { CarMakeSchema } from "../../data/schema";
import { getBase64 } from "../../lib/utils";

export async function action({ request }: ActionFunctionArgs) {
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
  const carMakeId = await db.carMakes.add(carMake);

  return redirect(`../${carMakeId}/cars/create`);
}

const CarMakesCreateRoute = () => {
  return (
    <div className="flex flex-col gap-4">
      <NewMakeForm />
    </div>
  );
};

export default CarMakesCreateRoute;
