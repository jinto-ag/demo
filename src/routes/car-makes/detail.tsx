import {
  Form,
  Link,
  LoaderFunctionArgs,
  Outlet,
  json,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { db } from "../../data/db";
import { Button } from "../../components/shadcn-ui/button";
import { IconCar, IconKey, IconPencil, IconTrash } from "@tabler/icons-react";
import { Field, ImageField } from "../../components/form";
import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint } from "@conform-to/zod";
import { CarMakeSchema } from "../../data/schema";
import { action as carMakeAction } from "./create";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id) {
    const carMake = await db.carMakes.get(Number.parseInt(params.id));
    return json({ carMake });
  }
  return json({ carMake: undefined });
}

const CarMakesDetailRoute = () => {
  const { carMake } = useLoaderData() as typeof loader;
  const actionData = useActionData() as typeof carMakeAction;

  const [form, fields] = useForm({
    id: "idCarMakeEditForm",
    constraint: getZodConstraint(CarMakeSchema),
    lastResult: actionData?.result,
    shouldValidate: "onBlur",
  });

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-h4">Car Make Detail</h4>
      <hr />
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Form {...getFormProps(form)} method="POST">
              <div className="flex gap-2">
                <ImageField
                  labelProps={{ children: "Make Logo" }}
                  inputProps={{
                    readOnly: true,
                  }}
                  preview={carMake.logo}
                  className="pointer-events-none"
                />
                <div className="flex flex-col gap-4">
                  <div className="flex items-end gap-2">
                    <Field
                      labelProps={{ children: "Name of the make" }}
                      inputProps={{ value: carMake.name, readOnly: true }}
                    />
                    <Button variant={"destructive"} formAction="delete">
                      <IconTrash />
                    </Button>
                    <Button
                      className="bg-blue-500 text-white"
                      formAction="edit"
                    >
                      <IconPencil />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/car-makes/${carMake.id}/cars/create`}>
                      <Button className="bg-blue-500 text-white inline-flex gap-2">
                        <IconCar />
                        Add its model
                      </Button>
                    </Link>
                    <Link to={`/car-makes/create`}>
                      <Button
                        variant={"secondary"}
                        className="inline-flex gap-2"
                      >
                        <IconKey />
                        Add new make
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default CarMakesDetailRoute;
