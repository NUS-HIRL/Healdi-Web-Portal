import { AddExerciseForm } from "@/components/patient-info/ai-exercise-recommendations/add-exercise-form"

interface AddExercisePageProps {
  params: Promise<{
    "patient-id": string
  }>
}

const AddExercisePage = async ({ params }: AddExercisePageProps) => {
  const { "patient-id": patientId } = await params

  return <AddExerciseForm patientId={patientId} />
}

export default AddExercisePage
