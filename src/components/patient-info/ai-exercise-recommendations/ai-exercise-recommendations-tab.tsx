/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Remove disable above and fix pagination
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Exercise } from "@/types/exercise"
import CustomDataTable from "@/components/common/table/custom-data-table"
import { ExerciseColumns } from "../../columns/exercise-columns"
import { ExerciseDetailsSidebar } from "./exercise-details-sidebar"

const INITIAL_DATA: Exercise[] = [
  {
    id: "1",
    activityType: "Brisk Walking",
    duration: 30,
    durationUnit: "minutes",
    frequency: 1,
    frequencyUnit: "daily",
    intensity: "Moderate",
    assignedOrSaved: "Assigned"
  },
  {
    id: "2",
    activityType: "Swimming",
    duration: 45,
    durationUnit: "minutes",
    frequency: 3,
    frequencyUnit: "per week",
    intensity: "High",
    assignedOrSaved: "Saved"
  },
  {
    id: "3",
    activityType: "Strength Training",
    duration: 20,
    durationUnit: "minutes",
    frequency: 2,
    frequencyUnit: "per week",
    intensity: "High",
    assignedOrSaved: "Assigned"
  },
  {
    id: "4",
    activityType: "Yoga",
    duration: 1,
    durationUnit: "hours",
    frequency: 1,
    frequencyUnit: "weekly",
    intensity: "Low",
    assignedOrSaved: "Saved"
  }
]

export const AiExerciseRecommendations = ({
  patientId
}: {
  patientId: string
}) => {
  const router = useRouter()
  const [rows, setRows] = useState<Exercise[]>(INITIAL_DATA)

  // pagination
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

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
  const results = {
    data: rows,
    totalCount: rows.length,
    page: 1,
    totalPages: Math.ceil(rows.length / pagination.pageSize)
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

  function handleEdit(exerciseId: string) {
    router.push(
      `/patient-info/${patientId}/ai-exercise-recommendation/edit/${exerciseId}`
    )
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
              pagination={{
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize
              }}
              error={null}
              isLoading={false}
              setPagination={setPagination}
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
