export enum GoalCompletionTypeEnum {
  SHORT_TERM = "SHORT_TERM",
  LONG_TERM = "LONG_TERM",
  ONE_OFF = "ONE_OFF"
}

export enum GoalCategoryEnum {
  MEDICAL_SELF_MANAGEMENT = "MEDICAL_SELF_MANAGEMENT",
  SMOKING = "SMOKING",
  SLEEP = "SLEEP"
}
export interface Goal {
  goal_id: string
  username: string
  category: GoalCategoryEnum
  title: string
  description: string
  completion_type: GoalCompletionTypeEnum
  coin_reward: number
  completion_bonus_reward: number
}
