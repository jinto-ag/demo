import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  IconCircleCheck,
  IconExclamationCircle,
  IconLoader2,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { db } from "../data/db";
import { CarMakeSchema } from "../data/schema";
import { Field, ImageField } from "./form";
import Button from "./ui/button";
import { CarMake } from "../data/type";

interface NewMakeFormProps {
  onSubmit?: (formData: FormData) => Promise<void>;
}

type Status = "idle" | "submitting" | "loading" | "error" | "success";

const NewMakeForm: React.FC<NewMakeFormProps> = ({ onSubmit }) => {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const fetchCarMakes = async () => {
      const bodyTypes = await db.bodyTypes.toArray();
      console.log({ bodyTypes });
    };

    fetchCarMakes();
  }, []);

  const [form, fields] = useForm({
    id: "idMakeAddForm",
    constraint: getZodConstraint(CarMakeSchema),
    shouldValidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CarMakeSchema });
    },
    onSubmit(e, { formData }) {
      e.preventDefault();
      setStatus("submitting");
      const carMake = Object.fromEntries(
        formData.entries()
      ) as unknown as CarMake;

      console.log({ carMake });

      db.carMakes.add(carMake).then(() => {
        setStatus("success");
        form.reset();
        setStatus("idle");
      });
    },
  });

  return (
    <div className="flex flex-col p-6 border shadow rounded-3xl gap-2 max-w-max">
      <h3 className="text-h4 mb-4 flex justify-between items-center">
        Add a new make
        {status !== "idle" && status === "success" ? (
          <IconCircleCheck className="text-green-500" />
        ) : status === "error" ? (
          <IconExclamationCircle className="text-red-500" />
        ) : null}
      </h3>
      <form {...getFormProps(form)} method="POST" encType="multipart/form-data">
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
      </form>
    </div>
  );
};

export default NewMakeForm;
