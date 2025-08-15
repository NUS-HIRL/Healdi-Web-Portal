import React from "react";
import {
  useController,
  useFormContext,
  type Control,
  type RegisterOptions,
} from "react-hook-form";

type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "onChange" | "onBlur" | "defaultValue" | "ref"
>;

export interface TextInputProps extends BaseInputProps {
  label?: string;
  name: string;               
  rules?: RegisterOptions;     
  control?: Control<any>;      
  className?: string;
}

export function TextInput({
  label,
  name,
  rules,
  control: controlProp,
  className = "",
  id,
  disabled,
  type = "text",
  ...rest
}: TextInputProps) {
  const form = useFormContext<any>();
  const control = controlProp ?? form?.control;

  if (!control) {
    throw new Error(
      "TextInput must be used within a FormProvider or be given a `control` prop."
    );
  }

  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  const error = fieldState.error?.message as string | undefined;
  const inputId = id ?? name;

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={inputId} className="mb-1 text-sm text-gray-600">
          {label}
        </label>
      )}

      <input
        id={inputId}
        name={field.name}
        value={field.value ?? ""}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        type={type}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
