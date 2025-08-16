"use client";

import * as React from "react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";

type BaseCheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "checked" | "onChange" | "onBlur" | "value" | "defaultChecked"
>;

export interface CheckboxProps<TValues extends FieldValues = FieldValues>
  extends BaseCheckboxProps {
  label: string;
  name: Path<TValues>;
  rules?: RegisterOptions<TValues, Path<TValues>>;
  control?: Control<TValues>;
  indeterminate?: boolean;
  className?: string;
}

export function Checkbox<TValues extends FieldValues = FieldValues>({
  label,
  name,
  rules,
  control: controlProp,
  indeterminate,
  className = "",
  id,
  disabled,
  ...rest
}: CheckboxProps<TValues>) {
  const form = useFormContext<TValues>();
  const control = controlProp ?? form.control;

  const { field, fieldState } = useController<TValues, Path<TValues>>({
    name,
    control,
    rules,
  });

  const error = fieldState.error?.message;
  const inputId = id ?? (name as string);

  // Support visual "indeterminate"
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className="flex items-center space-x-2 text-sm text-gray-600">
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
