export enum DurationUnit {
  MINUTES = "minutes",
  HOURS = "hours"
}

export enum FrequencyUnit {
  PER_DAY = "per day",
  PER_WEEK = "per week", 
  PER_MONTH = "per month",
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly"
}

export enum IntensityLevel {
  LOW = "Low",
  MODERATE = "Moderate",
  HIGH = "High"
}

export enum AssignmentStatus {
  ASSIGNED = "Assigned",
  SAVED = "Saved"
}

type Exercise = {
  id: string
  activityType: string
  duration: number
  durationUnit: DurationUnit
  frequency: number
  frequencyUnit: FrequencyUnit
  intensity: IntensityLevel
  assignedOrSaved: AssignmentStatus
}

export type { Exercise }
