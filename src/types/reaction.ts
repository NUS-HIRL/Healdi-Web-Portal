export type Reaction =
  | "Skin Rash"
  | "Fever"
  | "Dizziness"
  | "Swelling"
  | "Itching"
  | "Nausea"
  | "Others"

export type AllergyItem = {
  id: string
  title: string
  reactions: Reaction[]
  other?: string
}
