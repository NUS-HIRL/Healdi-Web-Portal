// this is a generic multi select, default to allergic reactions if nothing is passed
"use client"

import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import type { Reaction } from "@/types/reaction"
import { ChevronDown, X } from "lucide-react"

const DEFAULT_REACTION_OPTIONS = [
  "Skin Rash",
  "Fever",
  "Dizziness",
  "Swelling",
  "Itching",
  "Nausea",
  "Others"
] as const satisfies readonly Reaction[]

type StringLike = string

export const MultiSelect = <T extends StringLike = Reaction>({
  value,
  onChange,
  placeholder = "Select reactions",
  options
}: {
  value: T[]
  onChange: (next: T[]) => void
  placeholder?: string
  /** optional; falls back to reaction options for allergy screen */
  options?: readonly T[]
}) => {
  const [open, setOpen] = useState(false)
  const opts = (options ??
    (DEFAULT_REACTION_OPTIONS as unknown as readonly T[]))

  const toggle = (opt: T) => {
    const has = value.includes(opt)
    onChange(has ? value.filter((v) => v !== opt) : [...value, opt])
  }

  const clear = (opt: T) => onChange(value.filter((v) => v !== opt))

  const onKeyActivate = (e: React.KeyboardEvent, fn: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      e.stopPropagation()
      fn()
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* TRIGGER */}
        <button
          type="button"
          className="w-full min-h-10 rounded-md border border-gray-300 text-left px-2 py-2 relative focus:outline-none focus:ring-2 focus:ring-pink-500">
          <div className="flex flex-wrap gap-2 pr-6">
            {value.length === 0 ? (
              <span className="text-gray-400">{placeholder}</span>
            ) : (
              value.map((v) => (
                <Badge
                  key={String(v)}
                  variant="secondary"
                  className="gap-1 bg-gray-100 text-gray-800 border border-gray-200">
                  {v}
                  {/* remove control */}
                  <span
                    role="button"
                    aria-label={`Remove ${String(v)}`}
                    tabIndex={0}
                    className="ml-1 -mr-0.5 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      clear(v)
                    }}
                    onKeyDown={(e) => onKeyActivate(e, () => clear(v))}>
                    <X className="h-3 w-3" />
                  </span>
                </Badge>
              ))
            )}
          </div>
          <ChevronDown className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[320px] p-2">
        <div className="grid gap-1">
          {opts.map((opt) => {
            const checked = value.includes(opt)
            return (
              <div
                key={String(opt)}
                role="button"
                tabIndex={0}
                onClick={() => toggle(opt)}
                onKeyDown={(e) => onKeyActivate(e, () => toggle(opt))}
                className="flex items-center justify-between rounded px-2 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500">
                <span className="text-sm">{opt}</span>
                <Checkbox checked={checked} onCheckedChange={() => toggle(opt)} />
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
