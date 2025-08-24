import { PatientDashboard } from "@/components/patient-info/patient-dashboard"

interface PatientInfoPageProps {
  params: Promise<{
    "patient-id": string
  }>
}

const PatientInfoPage = async ({ params }: PatientInfoPageProps) => {
  const { "patient-id": patientId } = await params
  return <PatientDashboard patientId={patientId} />
}

export default PatientInfoPage
