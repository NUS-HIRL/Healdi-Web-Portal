export interface Patient {
  id: string
  username: string
  patientUid: string // TODO: Remove after confirming w Ethan if needed
  age: number
  gender: "M" | "F"
  fitnessLevel: "High" | "Moderate" | "Low"
  hrv: number
  healthConditions: string[]
  goals: string[]
}
