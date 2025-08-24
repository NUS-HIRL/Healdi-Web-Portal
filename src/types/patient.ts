export interface Patient {
  id: string
  patientUid: string
  age: number
  gender: "M" | "F"
  fitnessLevel: "High" | "Moderate" | "Low"
  hrv: number
  healthConditions: string[]
  goals: string[]
}
