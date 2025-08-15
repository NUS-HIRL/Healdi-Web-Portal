"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onValid?: (values: any, e?: React.BaseSyntheticEvent) => void;
  onInvalid?: (errors: any, e?: React.BaseSyntheticEvent) => void;
  disableWhileSubmitting?: boolean;
  disableWhenInvalid?: boolean;
  isLoading?: boolean;
}

export function Button({
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
}: ButtonProps) {
  const form = useFormContext<any>();
  const inForm = !!form;

  const isSubmitting = inForm ? form.formState.isSubmitting : false;
  const isValid = inForm ? form.formState.isValid : true;

  const computedLoading = Boolean(isLoading ?? (disableWhileSubmitting && isSubmitting));
  const computedDisabled =
    disabled ||
    (disableWhileSubmitting && isSubmitting) ||
    (disableWhenInvalid && !isValid);

  const wiredOnClick =
    onValid || onInvalid
      ? (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (inForm) {
            form.handleSubmit(onValid ?? (() => {}), onInvalid ?? (() => {}))(e);
          } else {
            onClick?.(e);
          }
        }
      : onClick;

  const resolvedType =
    onValid || onInvalid ? "button" : (type ?? "submit");

  return (
    <button
      type={resolvedType as "button" | "submit" | "reset"}
      onClick={wiredOnClick}
      disabled={computedDisabled}
      className={`w-full py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      aria-busy={computedLoading}
      {...rest}
    >
      {computedLoading ? (
        <span className="inline-flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              opacity="0.25"
            />
            <path
              d="M22 12a10 10 0 00-10-10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          Processing…
        </span>
      ) : (
        children
      )}
    </button>
  );
}
