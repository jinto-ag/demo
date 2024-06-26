import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  IconCircleCheck,
  IconExclamationCircle,
  IconLoader2,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { CarMakeSchema } from "../data/schema";
import { action as carMakesCreateAction } from "../routes/car-makes/create";
import { Field, ImageField } from "./form";
import Button from "./ui/button";
import { CarMake } from "../data/type";

interface NewMakeFormProps {
  initialValue?: CarMake;
  action: "edit" | "create";
  onSubmit?: (formData: FormData) => Promise<void>;
}

type Status = "idle" | "submitting" | "loading" | "error" | "success";

const NewMakeForm: React.FC<NewMakeFormProps> = ({
  onSubmit,
  action,
  initialValue,
}) => {
  const actionData = useActionData() as typeof carMakesCreateAction;

  const [status, setStatus] = useState<Status>("idle");

  const [form, fields] = useForm({
    id: "idcarMakeCreateForm",
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
        {action === "create" ? "Add a new make" : "Edit make"}
       
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
            }}
            errors={fields.logo.errors}
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
            {status !== "idle" && (
              <IconLoader2 className="animate-spin ease-linear" />
            )}
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewMakeForm;
