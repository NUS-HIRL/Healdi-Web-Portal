/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Remove disable above and fix pagination
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Eye } from "lucide-react"

import { Modal } from "../../common/modal"
import { LabeledInput } from "../../common/labeled-input"
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
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  // add form (dummy)
  const [form, setForm] = useState<
    Pick<
      Exercise,
      | "activityType"
      | "duration"
      | "durationUnit"
      | "frequency"
      | "frequencyUnit"
      | "intensity"
      | "assignedOrSaved"
    >
  >({
    activityType: "",
    duration: 0,
    durationUnit: "minutes",
    frequency: 0,
    frequencyUnit: "per week",
    intensity: "",
    assignedOrSaved: ""
  })

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
    if (!form.activityType.trim()) {
      alert("Enter an activity type (dummy validation).")
      return
    }
    const newRow: Exercise = {
      id: String(Date.now()),
      activityType: form.activityType.trim(),
      duration: form.duration || 0,
      durationUnit: form.durationUnit || "minutes",
      frequency: form.frequency || 0,
      frequencyUnit: form.frequencyUnit || "per week",
      intensity: form.intensity || "Low",
      assignedOrSaved: form.assignedOrSaved || "Saved"
    }
    setRows((r) => [newRow, ...r])
    setShowAdd(false)
    setForm({
      activityType: "",
      duration: 0,
      durationUnit: "minutes",
      frequency: 0,
      frequencyUnit: "per week",
      intensity: "",
      assignedOrSaved: ""
    })
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
      {/* AI Exercise Recommendations Section */}
      <div className="px-6 pb-6">
        <div className="bg-gray-100">
          {/* Section Header */}
          <div className="py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                AI Exercise Recommendations
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-500 bg-transparent"
                onClick={() => setShowAdd(true)}>
                <Plus size={16} />
                Add
              </Button>
            </div>
          </div>

          {/* Exercise Recommendations Table */}
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

      {/* Exercise Details Sidebar */}
      <ExerciseDetailsSidebar
        exercise={selectedExercise}
        isOpen={isViewOpen}
        onClose={handleCloseView}
        patientId={patientId}
        onDelete={handleDelete}
      />

      {/* Add Modal (dummy) */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)} title="Add Exercise">
          <div className="space-y-3">
            <LabeledInput
              label="Activity Type"
              value={form.activityType}
              onChange={(e) =>
                setForm((f) => ({ ...f, activityType: e.target.value }))
              }
              placeholder="e.g. Brisk Walking"
            />
            <LabeledInput
              label="Duration"
              type="number"
              value={String(form.duration)}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  duration: parseInt(e.target.value) || 0
                }))
              }
              placeholder="e.g. 30"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration Unit
              </label>
              <select
                value={form.durationUnit}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    durationUnit: e.target.value as "minutes" | "hours"
                  }))
                }
                className="w-full border border-gray-300 rounded-lg p-2">
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
            <LabeledInput
              label="Frequency"
              type="number"
              value={String(form.frequency)}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  frequency: parseInt(e.target.value) || 0
                }))
              }
              placeholder="e.g. 3"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency Unit
              </label>
              <select
                value={form.frequencyUnit}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    frequencyUnit: e.target.value as Exercise["frequencyUnit"]
                  }))
                }
                className="w-full border border-gray-300 rounded-lg p-2">
                <option value="per day">Per Day</option>
                <option value="per week">Per Week</option>
                <option value="per month">Per Month</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <LabeledInput
              label="Intensity"
              value={form.intensity}
              onChange={(e) =>
                setForm((f) => ({ ...f, intensity: e.target.value }))
              }
              placeholder="e.g. Moderate"
            />
            <LabeledInput
              label="Assigned/Saved"
              value={form.assignedOrSaved}
              onChange={(e) =>
                setForm((f) => ({ ...f, assignedOrSaved: e.target.value }))
              }
              placeholder="e.g. Assigned"
            />
            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdd(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAdd}>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
