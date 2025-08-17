"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "value" | "onChange" | "onBlur" | "defaultValue"
>;

export interface PasswordInputProps<TValues extends FieldValues = FieldValues>
  extends BaseInputProps {
  label?: string;
  name: Path<TValues>;
  rules?: RegisterOptions<TValues, Path<TValues>>;
  control?: Control<TValues>;
  className?: string;
}

export function PasswordInput<TValues extends FieldValues = FieldValues>({
  label,
  name,
  rules,
  control: controlProp,
  className = "",
  id,
  disabled,
  ...rest
}: PasswordInputProps<TValues>) {
  const [visible, setVisible] = React.useState(false);

  const form = useFormContext<TValues>();
  const control = controlProp ?? form?.control;

  if (!control) {
    throw new Error(
      "PasswordInput must be used within a FormProvider or be given a `control` prop."
    );
  }

  const { field, fieldState } = useController<TValues, Path<TValues>>({
    name,
    control,
    rules,
  });

  const error = fieldState.error?.message;
  const inputId = id ?? (name as string);

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={inputId} className="mb-1 text-sm text-gray-600">
          {label}
        </label>
      )}

      <div className="relative">
        <Input
          id={inputId}
          name={field.name}
          value={String(field.value ?? "")}
          onChange={(e) => field.onChange((e.target as HTMLInputElement).value)}
          onBlur={field.onBlur}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className={[
            "pr-10 rounded-full",
            error ? "border-red-500" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Show password"}
          disabled={disabled}
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${
            disabled ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
