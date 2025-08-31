import { EditMedicationPage } from "@/components/patient-info/medications/edit-medication-page"

interface EditMedicationPageProps {
  params: Promise<{
    medicationId: string
  }>
}
const EditMedicationPlanRoute = async ({ params }: EditMedicationPageProps) => {
  const { medicationId } = await params
  return <EditMedicationPage medicationId={medicationId} />
}

export default EditMedicationPlanRoute
