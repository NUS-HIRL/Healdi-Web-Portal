import { DetailsSidebarDataItem } from "@/components/common/sidebar/details-sidebar"
import { BADGE_ELIGIBLE_KEYS } from "@/constants/utils"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const mapToDetailsSidebarItem = <
  T extends { [key: string]: string | number | boolean }
>(
  data: T | null
): DetailsSidebarDataItem => {
  const detailsSidebarDataItem: DetailsSidebarDataItem = {
    id: "",
    title: "",
    value: "",
    isBadge: false
  }

  if (data == null) return detailsSidebarDataItem

  const keys = Object.keys(data)

  for (const key of keys) {
    detailsSidebarDataItem["title"] = key
    if (BADGE_ELIGIBLE_KEYS.includes(key)) {
      detailsSidebarDataItem["isBadge"] = true
    }

    detailsSidebarDataItem["value"] = data[key]
  }

  return detailsSidebarDataItem
}
