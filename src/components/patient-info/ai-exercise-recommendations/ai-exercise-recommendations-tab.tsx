/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Remove disable above and fix pagination
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Exercise,
  DurationUnit,
  FrequencyUnit,
  IntensityLevel,
  AssignmentStatus
} from "@/types/exercise"
import CustomDataTable from "@/components/common/table/custom-data-table"
import { ExerciseColumns } from "../../columns/exercise-columns"
import { ExerciseDetailsSidebar } from "./exercise-details-sidebar"
import usePagination from "@/hooks/use-pagination"
import { PaginatedResponse } from "@/types/response"

const INITIAL_DATA: Exercise[] = [
  {
    id: "1",
    activityType: "Brisk Walking",
    duration: 30,
    durationUnit: DurationUnit.MINUTES,
    frequency: 1,
    frequencyUnit: FrequencyUnit.DAILY,
    intensity: IntensityLevel.MODERATE,
    assignedOrSaved: AssignmentStatus.ASSIGNED
  },
  {
    id: "2",
    activityType: "Swimming",
    duration: 45,
    durationUnit: DurationUnit.MINUTES,
    frequency: 3,
    frequencyUnit: FrequencyUnit.PER_WEEK,
    intensity: IntensityLevel.HIGH,
    assignedOrSaved: AssignmentStatus.SAVED
  },
  {
    id: "3",
    activityType: "Strength Training",
    duration: 20,
    durationUnit: DurationUnit.MINUTES,
    frequency: 2,
    frequencyUnit: FrequencyUnit.PER_WEEK,
    intensity: IntensityLevel.HIGH,
    assignedOrSaved: AssignmentStatus.ASSIGNED
  },
  {
    id: "4",
    activityType: "Yoga",
    duration: 1,
    durationUnit: DurationUnit.HOURS,
    frequency: 1,
    frequencyUnit: FrequencyUnit.WEEKLY,
    intensity: IntensityLevel.LOW,
    assignedOrSaved: AssignmentStatus.SAVED
  }
]

export const AiExerciseRecommendations = ({
  patientId
}: {
  patientId: string
}) => {
  const router = useRouter()
  const [rows, setRows] = useState<Exercise[]>(INITIAL_DATA)

  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10
  })

  // TODO: Copy goals-tab way of calling the API once ready
  const { setCurrentPaginationTokenAndPageIndex, paginationToken } =
    usePagination(pagination, setPagination)

  // modals
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  )
  const [isViewOpen, setIsViewOpen] = useState(false)

  const handleViewExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setIsViewOpen(true)
  }

  const columns = ExerciseColumns({
    onViewExercise: handleViewExercise
  })

  const ExerciseTable = CustomDataTable<Exercise>

  // Mock paginated results
  const results: PaginatedResponse<Exercise> = {
    data: rows,
    count: rows.length,
    pagination: {
      next_page_key: null,
      previous_page_key: null
    }
  }

  function handleAdd() {
    router.push(`/patient-info/${patientId}/ai-exercise-recommendation/add`)
  }

  function handleDelete(exerciseId: string) {
    if (confirm("Are you sure you want to delete this exercise?")) {
      setRows((r) => r.filter((row) => row.id !== exerciseId))
      setIsViewOpen(false)
      setSelectedExercise(null)
    }
  }

  // Handle close view
  const handleCloseView = () => {
    setIsViewOpen(false)
    setSelectedExercise(null)
  }

  return (
    <div className="bg-gray-100">
      <div className="px-6 pb-6">
        <div className="bg-gray-100">
          <div className="py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                AI Exercise Recommendations
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-500 bg-transparent"
                onClick={handleAdd}>
                <Plus size={16} />
                Add
              </Button>
            </div>
          </div>

          <div className="py-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Exercise Recommendations List
            </h3>

            <ExerciseTable
              data={results}
              columns={columns}
              pagination={pagination}
              error={null}
              isLoading={false}
              setPagination={setPagination}
              paginationToken={paginationToken}
              setCurrentPaginationTokenAndPageIndex={
                setCurrentPaginationTokenAndPageIndex
              }
            />
          </div>
        </div>
      </div>

      <ExerciseDetailsSidebar
        exercise={selectedExercise}
        isOpen={isViewOpen}
        onClose={handleCloseView}
        patientId={patientId}
        onDelete={handleDelete}
      />
    </div>
  )
}
