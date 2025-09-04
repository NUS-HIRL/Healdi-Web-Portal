export interface Medication {
  id?: string
  name: string
  dosage: string
  type: string
  creator: string
  created_at?: string // Remove ? once other mock data conform to this typing
  updated_at?: string // Remove ? once other mock data conform to this typing
  is_all_items?: boolean // Used for DynamoDB to scan through all the entries, temporary field that should default to True
}

export type MedicationType =
  | "Tablet"
  | "Capsule"
  | "Syrup"
  | "Injection"
  | "Drops"
  | "Patch"
  | "Other"

export type MedicationTableValue = {
  id: string
  name: string
  dosage: string
  type: MedicationType
  custom?: boolean
  selected?: boolean
  creator?: string
  created_at?: string // Remove ? once other mock data conform to this typing
  updated_at?: string // Remove ? once other mock data conform to this typing
  is_all_items?: boolean // Used for DynamoDB to scan through all the entries, temporary field that should default to True
}

export type Medications = Medication[]

export enum DayAbbr {
  Mon = "Mon",
  Tue = "Tue",
  Wed = "Wed",
  Thu = "Thu",
  Fri = "Fri",
  Sat = "Sat",
  Sun = "Sun"
}
