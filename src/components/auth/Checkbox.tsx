import React, { useEffect, useRef } from "react";
import {
  useController,
  useFormContext,
  type Control,
  type RegisterOptions,
} from "react-hook-form";

type BaseCheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "checked" | "onChange" | "onBlur" | "value" | "defaultChecked" | "ref"
>;

export interface CheckboxProps extends BaseCheckboxProps {
  label: string;
  name: string;                
  rules?: RegisterOptions;    
  control?: Control<any>;      
  indeterminate?: boolean;    
  className?: string;
}

export function Checkbox({
  label,
  name,
  rules,
  control: controlProp,
  indeterminate,
  className = "",
  id,
  disabled,
  ...rest
}: CheckboxProps) {
  const form = useFormContext<any>();
  const control = controlProp ?? form?.control;

  if (!control) {
    throw new Error(
      "Checkbox must be used within a FormProvider or be given a `control` prop."
    );
  }

  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: false,
  });

  const error = fieldState.error?.message as string | undefined;
  const inputId = id ?? name;

  // Support the visual 'indeterminate' state
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputId}
        className="flex items-center space-x-2 text-sm text-gray-600"
      >
        <input
          id={inputId}
          name={field.name}
          type="checkbox"
          checked={!!field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          onBlur={field.onBlur}
          ref={(el) => {
            field.ref(el);
            inputRef.current = el;
          }}
          disabled={disabled}
          className={`w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400 ${
            className ?? ""
          } ${error ? "ring-1 ring-red-500" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        <span>{label}</span>
      </label>

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
