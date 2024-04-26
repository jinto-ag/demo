import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import React from "react";
import { Form, useActionData } from "react-router-dom";
import { CarMakeSchema } from "../data/schema";
import { CarMake } from "../data/type";
import { action as carMakesEditAction } from "../routes/car-makes/edit";
import { Field, ImageField } from "./form";
import Button from "./ui/button";

interface CarMakeEditFormProps {
  initialValue?: CarMake;
}

const CarMakeEditForm: React.FC<CarMakeEditFormProps> = ({ initialValue }) => {
  const actionData = useActionData() as typeof carMakesEditAction;

  const [form, fields] = useForm({
    id: "idcarMakeEditForm",
    constraint: getZodConstraint(CarMakeSchema),
    shouldValidate: "onInput",
    lastResult: actionData?.result,
    defaultValue: initialValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CarMakeSchema });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-h4 mb-4 flex justify-between items-center">
        Edit Make
      </h3>
      <Form
        {...getFormProps(form)}
        method="POST"
        encType="multipart/form-data"
        action="/car-makes/create"
      >
        <div className="flex gap-4 items-end">
          <ImageField
            labelProps={{ children: "Make Logo" }}
            inputProps={{
              ...getInputProps(fields.logo, {
                type: "file",
              }),
              defaultValue: "",
            }}
            errors={fields.logo.errors}
            preview={
              getInputProps(fields.logo, {
                type: "file",
              }).defaultValue
            }
          />
          <Field
            labelProps={{ children: "Name of the make" }}
            inputProps={{
              ...getInputProps(fields.name, {
                type: "text",
              }),
              placeholder: "Enter make name",
            }}
            errors={fields.name.errors}
          />
          <Button
            type="submit"
            disabled={fields.logo.errors || fields.name.errors ? true : false}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CarMakeEditForm;
