type HealthCondition = {
  id: string
  name: string
  severity: "Low" | "Moderate" | "High"
  diagnosedDate: string
  status: "Active" | "Inactive" | "Monitoring"
  description?: string
  treatmentNotes?: string
  lastUpdated?: string
}

export type { HealthCondition }
