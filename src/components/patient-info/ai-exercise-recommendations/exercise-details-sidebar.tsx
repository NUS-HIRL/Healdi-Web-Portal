"use client"

import { DetailsSidebar } from "@/components/common/sidebar/details-sidebar"
import { Subtitle } from "@/components/common/sidebar/subtitle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Exercise } from "@/types/exercise"
import { useRouter } from "next/navigation"

interface ExerciseDetailsSidebarProps {
  exercise: Exercise | null
  isOpen: boolean
  onClose: () => void
  patientId: string
  onDelete: (exerciseId: string) => void
}

export const ExerciseDetailsSidebar = ({
  exercise,
  isOpen,
  onClose,
  patientId,
  onDelete
}: ExerciseDetailsSidebarProps) => {
  const router = useRouter()

  const handleEdit = () => {
    if (exercise) {
      router.push(
        `/patient-info/${patientId}/ai-exercise-recommendation/edit/${exercise.id}`
      )
    }
  }

  const handleDelete = () => {
    if (exercise) {
      onDelete(exercise.id)
    }
  }

  return (
    <DetailsSidebar isOpen={isOpen} onClose={onClose}>
      {exercise && (
        <div className="space-y-4 ml-4 mr-4">
          <Separator className="mt-0" />

          <div className="space-y-2">
            <Subtitle title="Activity Type" />
            <p className="text-sm text-gray-900">{exercise.activityType}</p>
          </div>

          <Separator className="mt-2" />

          <div className="space-y-2">
            <Subtitle title="Duration" />
            <p className="text-sm text-gray-900 font-medium">
              {exercise.duration} {exercise.durationUnit}
            </p>
          </div>

          <Separator className="mt-2" />

          <div className="space-y-2">
            <Subtitle title="Frequency" />
            <p className="text-sm text-gray-900 font-medium">
              {exercise.frequency} {exercise.frequencyUnit}
            </p>
          </div>

          <Separator className="mt-2" />

          <div className="space-y-2">
            <Subtitle title="Intensity" />
            <p className="text-sm text-gray-900">{exercise.intensity}</p>
          </div>

          <Separator className="mt-2" />

          <div className="space-y-2">
            <Subtitle title="Status" />
            <p className="text-sm text-gray-900">{exercise.assignedOrSaved}</p>
          </div>

          <Separator className="mt-2" />

          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 bg-black text-white border-gray-700 hover:bg-gray-800 hover:border-gray-800"
              onClick={handleEdit}>
              Edit
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </DetailsSidebar>
  )
}
