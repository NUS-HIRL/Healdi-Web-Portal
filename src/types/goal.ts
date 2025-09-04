export enum GoalCompletionTypeEnum {
  SHORT_TERM = "SHORT_TERM",
  LONG_TERM = "LONG_TERM",
  ONE_OFF = "ONE_OFF"
}

export enum GoalCategoryEnum {
  MEDICAL_SELF_MANAGEMENT = "MEDICAL_SELF_MANAGEMENT",
  RELATIONSHIPS = "RELATIONSHIPS",
  EMOTIONAL_WELL_BEING = "EMOTIONAL_WELL_BEING",
  EXERCISE = "EXERCISE",
  DIET = "DIET",
  WORK_LIFE_BALANCE = "WORK_LIFE_BALANCE",
  SMOKING = "SMOKING",
  SLEEP = "SLEEP",
  ALCOHOL = "ALCOHOL",
  STRESS = "STRESS",
  MINDFULNESS = "MINDFULNESS"
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
  current_completion_count: number
  target_completion_count: number
}
