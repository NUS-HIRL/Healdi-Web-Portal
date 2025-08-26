import { ConfirmResourceSelectionPage } from "@/components/patient-info/resources/confirm-resource-selection-page"

interface ConfirmResourceSelectionProps {
  params: {
    "patient-id": string
  }
}

export default function ConfirmResourceSelection({ params }: ConfirmResourceSelectionProps) {
  return <ConfirmResourceSelectionPage patientId={params["patient-id"]} />
}
