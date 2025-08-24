import * as React from "react"
import { Input } from "@/components/ui/input"

export const LabeledInput = ({
  label,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  const inputId =
    id ?? (typeof props.name === "string" ? props.name : undefined)

  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-600">{label}</span>
      <Input id={inputId} {...props} />
    </label>
  )
}
