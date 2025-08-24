import { EditGoalPage } from "@/components/patient-info/goals/edit-goal-page"

interface EditGoalPageProps {
  params: Promise<{
    goalId: string
  }>
}

const EditGoalPageRoute = async ({ params }: EditGoalPageProps) => {
  const { goalId } = await params
  return <EditGoalPage goalId={goalId} />
}

export default EditGoalPageRoute
