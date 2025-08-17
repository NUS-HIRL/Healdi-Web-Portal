import { EditGoalPage } from '@/components/patient-info/goals/edit-goal-page'

interface EditGoalPageProps {
  params: {
    goalId: string
  }
}

export default function EditGoalPageRoute({ params }: EditGoalPageProps) {
  return <EditGoalPage goalId={params.goalId} />
}
