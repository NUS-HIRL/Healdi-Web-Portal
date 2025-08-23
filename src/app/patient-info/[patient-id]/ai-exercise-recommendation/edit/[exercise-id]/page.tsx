import { EditExerciseForm } from "@/components/patient-info/ai-exercise-recommendations/edit-exercise-form"

interface EditExercisePageProps {
  params: Promise<{
    'exercise-id': string
  }>
}

export default async function EditExercisePage({ params }: EditExercisePageProps) {
  const { 'exercise-id': exerciseId } = await params

  return <EditExerciseForm exerciseId={exerciseId} />
}
