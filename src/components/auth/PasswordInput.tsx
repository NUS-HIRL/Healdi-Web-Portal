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
  "type" | "name" | "value" | "onChange" | "onBlur" | "defaultValue" | "id"
>;

export interface PasswordInputProps<TValues extends FieldValues>
  extends BaseInputProps {
  label?: string;
  name: Path<TValues>;
  rules?: RegisterOptions<TValues, Path<TValues>>;
  control?: Control<TValues>;
  className?: string;
}

export const PasswordInput = <TValues extends FieldValues>({
  label,
  name,
  rules,
  control: controlProp,
  className = "",
  disabled,
  ...rest
}: PasswordInputProps<TValues>) => {
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

  return (
    <div className="flex flex-col">
      {label && <span className="mb-1 text-sm text-gray-600">{label}</span>}

      <div className="relative">
        <Input
          name={field.name}
          value={String(field.value ?? "")}
          onChange={(e) => field.onChange((e.target as HTMLInputElement).value)}
          onBlur={field.onBlur}
          ref={field.ref}
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
          {...rest}
          placeholder="Password"
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

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
