import { getZodConstraint } from "@conform-to/zod";

import {
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { CarSchema } from "../data/schema";
import { Car } from "../data/type";
import { action, loader } from "../routes/cars/edit";
import { CheckboxField, Field, SelectField } from "./form";
import { Button } from "./shadcn-ui/button";

interface Props {
  initialValue: Car;
}

const CarEditForm = ({ initialValue }: Props) => {
  const { bodyTypes, transmissionModels, engineCapacities, makeId } =
    useLoaderData() as typeof loader;
  const actionData = useActionData() as typeof action;

  const [form, fields] = useForm({
    id: "idCarCreateForm",
    constraint: getZodConstraint(CarSchema),
    lastResult: actionData?.result,
    defaultValue: initialValue,
    shouldValidate: "onBlur",
  });

  return (
    <div>
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
  );
};

export default CarEditForm;
