export interface Medication {
  id?: string
  name: string
  dosage: string
  type: string
  creator: string
}

export type MedicationType = "Tablet" | "Capsule" | "Syrup" | "Injection" | "Drops" | "Patch" | "Other"

export type MedicationTableValue = {
  id: string
  name: string
  dosage: string
  type: MedicationType
  custom?: boolean        
  selected?: boolean   
  creator?: string   
}

export type Medications = Medication[]
