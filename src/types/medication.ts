export interface Medication {
  id: string
  name: string
  dosage: string
  type: string
  creator: string
  [key: string]: string | number | boolean
}
