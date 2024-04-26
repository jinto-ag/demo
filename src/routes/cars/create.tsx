import { getZodConstraint, parseWithZod } from "@conform-to/zod";

import {
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import {
  Form,
  json,
  useActionData,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  useLoaderData,
  redirect,
} from "react-router-dom";
import { CheckboxField, Field, SelectField } from "../../components/form";
import { Button } from "../../components/shadcn-ui/button";
import { db } from "../../data/db";
import { CarSchema } from "../../data/schema";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const bodyTypes = await db.bodyTypes.toArray();
  const transmissionModels = await db.transmissionModels.toArray();
  const engineCapacities = await db.engineCapacities.toArray();

  return json({
    bodyTypes,
    transmissionModels,
    engineCapacities,
    makeId: params.id,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = await parseWithZod(formData, {
    schema: CarSchema,
    async: true,
  });

  console.log({ submission });

  if (submission.status !== "success") {
    return json({ result: submission.reply() }, { status: 400 });
  }
  const carId = await db.cars.add(submission.value);
  console.log({ carId });

  return json({ result: { ...submission.value, id: carId } }, { status: 200 });
}

const CarCreateRoute = () => {
  const { bodyTypes, transmissionModels, engineCapacities, makeId } =
    useLoaderData() as typeof loader;
  const actionData = useActionData() as typeof action;

  const [form, fields] = useForm({
    id: "idCarCreateForm",
    constraint: getZodConstraint(CarSchema),
    lastResult: actionData?.result,
    shouldValidate: "onBlur",
  });

  return (
    <div>
      <div className="flex p-4 border rounded-2xl bg-gray-200/50">
        <Form
          {...getFormProps(form)}
          method="POST"
          className="flex flex-col gap-4"
        >
          <div className="flex items-start gap-4">
            <Field
              labelProps={{ children: "Name of the model" }}
              inputProps={{
                ...getInputProps(fields.modelName, { type: "text" }),
                placeholder: "Enter name of the model",
              }}
              errors={fields.modelName.errors}
            />
            <Field
              labelProps={{ children: "Year of the model" }}
              inputProps={{
                ...getInputProps(fields.modelYear, { type: "text" }),
                placeholder: "Enter year of the model",
              }}
              errors={fields.modelYear.errors}
            />
          </div>
          <div className="flex gap-4">
            <SelectField
              labelProps={{ children: "Transmission Model" }}
              selectProps={{ ...getSelectProps(fields.transmissionModelId) }}
              options={transmissionModels.map((type) => ({
                value: `${type.id}`,
                label: type.name,
              }))}
              errors={fields.transmissionModel.errors}
            />
            <SelectField
              labelProps={{ children: "Body Type" }}
              selectProps={{ ...getSelectProps(fields.bodyTypeId) }}
              options={bodyTypes.map((type) => ({
                value: `${type.id}`,
                label: type.name,
              }))}
              errors={fields.bodyType.errors}
            />
          </div>
          <div className="flex gap-4">
            <SelectField
              labelProps={{ children: "Engine Capacity" }}
              selectProps={{ ...getSelectProps(fields.engineCapacityId) }}
              options={engineCapacities.map((item) => ({
                value: `${item.id}`,
                label: `${item.capacity} ${item.unit.toUpperCase()}`,
              }))}
              errors={fields.engineCapacity.errors}
            />
          </div>
          <div>
            <CheckboxField
              labelProps={{ children: "Active" }}
              buttonProps={{
                ...getInputProps(fields.isActive, { type: "checkbox" }),
              }}
              errors={fields.isActive.errors}
            />
          </div>
          <input
            {...getInputProps(fields.makeId, { type: "hidden" })}
            value={`${makeId}`}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="inline-block bg-blue-500 text-white "
            >
              Add car
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CarCreateRoute;
