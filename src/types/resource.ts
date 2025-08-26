export interface Resource {
  id: string
  type: string
  source: string
  title: string
  assignedOrSaved: "Assigned" | "Saved"
  category?: string
  subCategory?: string
  url?: string
  imageUrl?: string
}
