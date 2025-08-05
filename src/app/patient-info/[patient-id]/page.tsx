import { PatientDashboard } from '@/components/patient-info/patient-dashboard'

interface PatientInfoPageProps {
  params: Promise<{
    'patient-id': string
  }>
}

export default async function PatientInfoPage({ params }: PatientInfoPageProps) {
  const { 'patient-id': patientId } = await params
  
  return <PatientDashboard patientId={patientId} />
}
