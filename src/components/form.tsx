import { IconCloudUpload } from "@tabler/icons-react";
import React, { useId, useState } from "react";
import { Input } from "./ui/input";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { useInputControl } from "@conform-to/react";
import { Checkbox } from "./shadcn-ui/checkbox";
import { Label } from "./shadcn-ui/label";
import { Textarea } from "./shadcn-ui/textarea";
import { cn } from "../lib/utils";

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
    <div className={cn("flex flex-col gap-2", className)}>
      {labelProps.children && (
        <label htmlFor={id} {...labelProps} className="">
          {labelProps.children}
          {inputProps.required && <span className="text-red-500">*</span>}
        </label>
      )}
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

interface ImageFieldProps extends FieldProps {
  preview?: string;
}

export function ImageField({
  labelProps,
  inputProps,
  errors,
  preview,
  className,
}: ImageFieldProps) {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  const [imgPreview, setImgPreview] = useState<string | null>(preview);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        {...labelProps}
        className={cn("flex flex-col gap-2", labelProps.className)}
      >
        <span className="text-gray-500 text-xs">
          {labelProps.children}
          {inputProps.required && <span className="text-red-500">*</span>}
        </span>
        <div
          className={cn(
            "w-16 h-16 border-4  border-dotted bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden rounded-2xl",
            errors && errors.length > 0 ? "border-red-500" : "border-gray-300"
          )}
        >
          {imgPreview ? (
            <img
              src={imgPreview}
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

export function TextareaField({
  labelProps,
  textareaProps,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  errors?: ListOfErrors;
  className?: string;
}) {
  const fallbackId = useId();
  const id = textareaProps.id ?? textareaProps.name ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <Label htmlFor={id} {...labelProps} />
      <Textarea
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        {...textareaProps}
      />
      {errorId && <ErrorList id={errorId} errors={errors} />}
    </div>
  );
}

export function CheckboxField({
  labelProps,
  buttonProps,
  errors,
  className,
}: {
  labelProps: JSX.IntrinsicElements["label"];
  buttonProps: CheckboxProps & {
    name: string;
    form: string;
    value?: string;
  };
  errors?: ListOfErrors;
  className?: string;
}) {
  const { key, defaultChecked, ...checkboxProps } = buttonProps;
  const fallbackId = useId();
  const checkedValue = buttonProps.value ?? "on";
  const input = useInputControl({
    key,
    name: buttonProps.name,
    formId: buttonProps.form,
    initialValue: defaultChecked ? checkedValue : undefined,
  });
  const id = buttonProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <div className="flex gap-2 items-center">
        <Checkbox
          {...checkboxProps}
          id={id}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          checked={input.value === checkedValue}
          onCheckedChange={(state) => {
            input.change(state.valueOf() ? checkedValue : "");
            buttonProps.onCheckedChange?.(state);
          }}
          onFocus={(event) => {
            input.focus();
            buttonProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            input.blur();
            buttonProps.onBlur?.(event);
          }}
          type="button"
        />
        <label htmlFor={id} {...labelProps} className="" />
      </div>
      {errorId && <ErrorList id={errorId} errors={errors} />}
    </div>
  );
}

interface SelectFieldProps extends Omit<FieldProps, "inputProps"> {
  selectProps: React.SelectHTMLAttributes<HTMLSelectElement>;
  options: {
    label: string;
    value: string;
  }[];
}

export function SelectField({
  labelProps,
  selectProps,
  options,
  errors,
  className,
}: SelectFieldProps) {
  const fallbackId = useId();
  const id = selectProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div className={cn("flex flex-col gap-2 flex-auto", className)}>
      <label htmlFor={id} {...labelProps} className="">
        {labelProps.children}
        {selectProps.required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        {...selectProps}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
      >
        {options.map((option, index) => (
          <option
            key={`${selectProps.name}-option-${index}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {errorId && <ErrorList id={errorId} errors={errors} />}
    </div>
  );
}
