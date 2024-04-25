import { IconCloudUpload } from "@tabler/icons-react";
import React, { useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "./ui/input";

export type ListOfErrors = Array<string | null | undefined> | null | undefined;
export interface FieldProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errors?: ListOfErrors;
  className?: string;
}

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;
  return (
    <ul id={id} className="flex flex-col gap-1 px-4">
      {errorsToRender.map((e) => (
        <li key={e} className="text-xs text-red-500 text-wrap w-full">
          {e}
        </li>
      ))}
    </ul>
  );
}

export function Field({
  labelProps,
  inputProps,
  errors,
  className,
}: FieldProps) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <label htmlFor={id} {...labelProps} className="">
        {labelProps.children}
        {inputProps.required && <span className="text-red-500">*</span>}
      </label>
      <Input
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        {...inputProps}
      />
      {errorId && <ErrorList id={errorId} errors={errors} />}
    </div>
  );
}

interface ImageFieldProps extends FieldProps {}

export function ImageField({
  labelProps,
  inputProps,
  errors,
  className,
}: ImageFieldProps) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        {...labelProps}
        className={twMerge("flex flex-col gap-2", labelProps.className)}
      >
        <span className="text-gray-500 text-xs">
          {labelProps.children}
          {inputProps.required && <span className="text-red-500">*</span>}
        </span>
        <div
          className={twMerge(
            "w-16 h-16 border-4  border-dotted bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden rounded-2xl",
            errors && errors.length > 0 ? "border-red-500" : "border-gray-300"
          )}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <IconCloudUpload className="text-gray-400" />
          )}
        </div>
        <Input
          id={id}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          {...inputProps}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
