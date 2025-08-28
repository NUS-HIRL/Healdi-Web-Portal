type Exercise = {
  id: string
  activityType: string
  duration: number
  durationUnit: "minutes" | "hours"
  frequency: number
  frequencyUnit:
    | "per day"
    | "per week"
    | "per month"
    | "daily"
    | "weekly"
    | "monthly"
  intensity: string
  assignedOrSaved: string
}

export type { Exercise }
