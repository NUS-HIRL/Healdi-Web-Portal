/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Remove disable above and fix pagination
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Eye } from "lucide-react"

import { Modal } from "../../common/modal"
import { KeyValueRow } from "../../common/key-value-row"
import { LabeledInput } from "../../common/labeled-input"
import { Button } from "@/components/ui/button"
import { Exercise } from "@/types/exercise"
import CustomDataTable from "@/components/common/table/custom-data-table"
import { ExerciseColumns } from "../../columns/exercise-columns"

const INITIAL_DATA: Exercise[] = [
  {
    id: "1",
    activityType: "Brisk Walking",
    duration: 30,
    frequency: 1,
    intensity: "Moderate",
    assignedOrSaved: "Assigned"
  },
  {
    id: "2",
    activityType: "Swimming",
    duration: 45,
    frequency: 3,
    intensity: "High",
    assignedOrSaved: "Saved"
  },
  {
    id: "3",
    activityType: "Strength Training",
    duration: 20,
    frequency: 2,
    intensity: "High",
    assignedOrSaved: "Assigned"
  },
  {
    id: "4",
    activityType: "Yoga",
    duration: 60,
    frequency: 1,
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
  const [viewing, setViewing] = useState<Exercise | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  // add form (dummy)
  const [form, setForm] = useState<
    Pick<
      Exercise,
      | "activityType"
      | "duration"
      | "frequency"
      | "intensity"
      | "assignedOrSaved"
    >
  >({
    activityType: "",
    duration: 0,
    frequency: 0,
    intensity: "",
    assignedOrSaved: ""
  })

  const handleViewExercise = (exercise: Exercise) => {
    setViewing(exercise)
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
      frequency: form.frequency || 0,
      intensity: form.intensity || "Low",
      assignedOrSaved: form.assignedOrSaved || "Saved"
    }
    setRows((r) => [newRow, ...r])
    setShowAdd(false)
    setForm({
      activityType: "",
      duration: 0,
      frequency: 0,
      intensity: "",
      assignedOrSaved: ""
    })
  }

  function handleDelete(exerciseId: string) {
    if (confirm("Are you sure you want to delete this exercise?")) {
      setRows((r) => r.filter((row) => row.id !== exerciseId))
      setViewing(null)
    }
  }

  function handleEdit(exerciseId: string) {
    router.push(
      `/patient-info/${patientId}/ai-exercise-recommendation/edit/${exerciseId}`
    )
  }

  return (
          Exercise Recommendations
        </h1>

        {/* Card */}
        <section className="rounded-xl border border-gray-200 bg-gray-50">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-800 font-semibold">
              Exercise Recommendation List
            </h2>
            <Button
              type="button"
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

      {/* View Modal (dummy) */}
      {viewing && (
        <Modal onClose={() => setViewing(null)} title="Exercise Details">
          <div className="flex flex-col gap-4">
            <div className="space-y-2 text-sm">
              <KeyValueRow label="Activity Type" value={viewing.activityType} />
              <KeyValueRow label="Duration" value={viewing.duration} />
              <KeyValueRow label="Frequency" value={viewing.frequency} />
              <KeyValueRow label="Intensity" value={viewing.intensity} />
              <KeyValueRow
                label="Assigned/Saved"
                value={viewing.assignedOrSaved}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDelete(viewing.id)}
                className="flex-1 border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
                Delete
              </Button>
              <Button
                type="button"
                onClick={() => handleEdit(viewing.id)}
                className="flex-1">
                Edit
              </Button>
            </div>
          </div>
        </Modal>
      )}

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
