import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  IconCircleCheck,
  IconExclamationCircle,
  IconLoader2,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { z } from "zod";
import { Field, ImageField } from "./form";
import Button from "./ui/button";

interface NewMakeFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

type Status = "idle" | "submitting" | "loading" | "error" | "success";

const FormSchema = z.object({
  makeName: z.string().min(3, "Make name must contain at least 3 character(s"),
  makeImage: z.instanceof(File, { message: "Select a valid image" }),
});

const NewMakeForm: React.FC<NewMakeFormProps> = ({ onSubmit }) => {
  const [status, setStatus] = useState<Status>("idle");

  const [form, fields] = useForm({
    id: "idMakeAddForm",
    constraint: getZodConstraint(FormSchema),
    shouldValidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: FormSchema });
    },
    onSubmit(e, { formData }) {
      e.preventDefault();
      setStatus("submitting");
      onSubmit(formData).then(() => {
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
              ...getInputProps(fields.makeImage, {
                type: "file",
              }),
            }}
            errors={fields.makeImage.errors}
          />
          <Field
            labelProps={{ children: "Name of the make" }}
            inputProps={{
              ...getInputProps(fields.makeName, {
                type: "text",
              }),
              placeholder: "Enter make name",
            }}
            errors={fields.makeName.errors}
          />
          <Button
            type="submit"
            disabled={
              fields.makeImage.errors || fields.makeName.errors ? true : false
            }
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
