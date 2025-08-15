import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  useController,
  useFormContext,
  type Control,
  type RegisterOptions,
} from "react-hook-form";

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "value" | "onChange" | "onBlur" | "defaultValue" | "ref"
> & {
  label?: string;
  name: string;               
  rules?: RegisterOptions;     
  control?: Control<any>;      
  className?: string;
};

export default function PasswordInput({
  label,
  name,
  rules,
  control: controlProp,
  className = "",
  id,
  disabled,
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  const form = useFormContext<any>();
  const control = controlProp ?? form.control;

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

      <div className="relative">
        <input
          id={inputId}
          name={field.name}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className={`w-full px-4 py-3 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Show password"}
          className={`absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500 ${
            disabled ? "opacity-50 pointer-events-none" : ""
          }`}
          disabled={disabled}
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
