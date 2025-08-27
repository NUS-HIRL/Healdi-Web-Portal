import { ConfirmResourceSelectionPage } from "@/components/patient-info/resources/confirm-resource-selection-page"

interface ConfirmResourceSelectionProps {
  params: Promise<{
    "patient-id": string
  }>
}

const ConfirmResourceSelection = async ({ params }: ConfirmResourceSelectionProps) => {
  const { "patient-id": patientId } = await params
  return <ConfirmResourceSelectionPage patientId={patientId} />
}

export default ConfirmResourceSelection
