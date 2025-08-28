import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { PaginatedResponse } from "@/types/response"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const buildDefaultPaginatedData = <T>(): PaginatedResponse<T> => {
  return {
    data: [] as T[],
    count: 0,
    pagination: {
      next_page_key: null,
      previous_page_key: null
    }
  }
}

export const toTitleCase = (str: string) => {
  if (typeof str !== "string" || str.length === 0) {
    return ""
  }

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}
