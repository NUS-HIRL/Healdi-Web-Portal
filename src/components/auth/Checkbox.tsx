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
import { Input } from "@/components/ui/input";

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

  // Set visual "indeterminate" by DOM property (no ref needed, keeps your Input unchanged)
  React.useEffect(() => {
    const el = document.getElementById(inputId) as HTMLInputElement | null;
    if (el) el.indeterminate = !!indeterminate;
  }, [indeterminate, inputId]);

  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className="flex items-center gap-2 text-sm text-gray-600">
        <Input
          id={inputId}
          name={field.name}
          type="checkbox"
          checked={!!field.value}
          onChange={(e) => field.onChange((e.target as HTMLInputElement).checked)}
          onBlur={field.onBlur}
          disabled={disabled}
          className={[
            // Override shadcn Input’s text-field sizing to a checkbox
            "h-4 w-4 w-auto min-w-0 px-0 py-0 rounded border",
            error ? "border-red-500" : "",
            className ?? "",
          ].join(" ")}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-checked={indeterminate ? "mixed" : undefined}
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
