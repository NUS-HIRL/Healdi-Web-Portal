export interface Goal {
  id: string
  category: string
  completionType: string
  title: string
  description: string
  coins: number
  bonus: number
  progress: string
}

// API response shape for a goal item returned by
// GET /dev/v1/users/{user_id}/goals
export interface ApiGoal {
  id: string
  goal_category:
    | "Exercise"
    | "Diet"
    | "Stress"
    | "Emotional Well Being"
    | "Medical Self Management"
  title: string
  description: string
  completion_type: "short" | "long"
  target_count: number
  completed_count: number
  coin_reward_per_completion: number
  completion_bonus: number
}
