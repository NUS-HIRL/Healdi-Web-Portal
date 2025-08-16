"use client";

import * as React from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onInvalid"
>;

export interface ButtonProps<TValues extends FieldValues = FieldValues>
  extends NativeButtonProps {
  children: React.ReactNode;
  onValid?: SubmitHandler<TValues>;
  onInvalid?: SubmitErrorHandler<TValues>;
  disableWhileSubmitting?: boolean;
  disableWhenInvalid?: boolean;
  isLoading?: boolean;
}

export function Button<TValues extends FieldValues = FieldValues>({
  children,
  className = "",
  type,
  onClick,
  onValid,
  onInvalid,
  disableWhileSubmitting = true,
  disableWhenInvalid = false,
  isLoading,
  disabled,
  ...rest
}: ButtonProps<TValues>) {
  const form = useFormContext<TValues>(); // must be inside <FormProvider>

  const { isSubmitting, isValid } = form.formState;

  const computedLoading =
    Boolean(isLoading) || (disableWhileSubmitting && isSubmitting);

  const computedDisabled =
    Boolean(disabled) ||
    (disableWhileSubmitting && isSubmitting) ||
    (disableWhenInvalid && !isValid);

  const wiredOnClick =
    onValid || onInvalid
      ? (e: React.MouseEvent<HTMLButtonElement>) => {
          form.handleSubmit(onValid ?? (() => {}), onInvalid ?? (() => {}))(e);
        }
      : onClick;

  const resolvedType: "button" | "submit" | "reset" =
    onValid || onInvalid ? "button" : (type ?? "submit");

  return (
    <button
      type={resolvedType}
      onClick={wiredOnClick}
      disabled={computedDisabled}
      className={`w-full py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      aria-busy={computedLoading}
      {...rest}
    >
      {computedLoading ? (
        <span className="inline-flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
          Processing…
        </span>
      ) : (
        children
      )}
    </button>
  );
}
