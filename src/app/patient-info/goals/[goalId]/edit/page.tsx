import { EditGoalPage } from '@/components/patient-info/goals/edit-goal-page'

interface EditGoalPageProps {
  params: Promise<{
    goalId: string
  }>
}

export default async function EditGoalPageRoute({ params }: EditGoalPageProps) {
  const { goalId } = await params
  return <EditGoalPage goalId={goalId} />
}
