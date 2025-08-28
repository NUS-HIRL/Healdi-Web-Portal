import { AddMedicationPage } from "@/components/patient-info/medications/add-medication-page"

interface PatientDashboardProps {
  params: Promise<{
    patientId: string
  }>
}
const AddMedicationPlanRoute = async ({params} : PatientDashboardProps) => {
  const { patientId } = await params
  return <AddMedicationPage patientId = {patientId}/>
}

export default AddMedicationPlanRoute 
