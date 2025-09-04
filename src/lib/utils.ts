import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Goal, GoalCategoryEnum, GoalCompletionTypeEnum } from "@/types/goal"
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

export const buildDefaultGoal = (): Goal => {
  return {
    goal_id: "",
    username: "",
    category: GoalCategoryEnum.SLEEP,
    title: "",
    description: "",
    completion_type: GoalCompletionTypeEnum.SHORT_TERM,
    coin_reward: 0,
    completion_bonus_reward: 0,
    current_completion_count: 0,
    target_completion_count: 0
  }
}
