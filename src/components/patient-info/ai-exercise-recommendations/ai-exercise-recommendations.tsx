/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Remove disable above and fix pagination
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Eye } from "lucide-react"

import { TableHeaderCell } from "../../common/table-header-cell"
import { Modal } from "../../common/modal"
import { KeyValueRow } from "../../common/key-value-row"
import { LabeledInput } from "../../common/labeled-input"
import { Button } from "@/components/ui/button"
import { Exercise } from "@/types/exercise"

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

export function AiExerciseRecommendations({
  patientId
}: {
  patientId: string
}) {
  const router = useRouter()
  const [rows, setRows] = useState<Exercise[]>(INITIAL_DATA)

  // sorting
  const [sortKey, setSortKey] = useState<keyof Exercise>("activityType")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  // pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [openPageSize, setOpenPageSize] = useState(false)

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

  const sorted = useMemo(() => {
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = String(a[sortKey] ?? "")
      const bv = String(b[sortKey] ?? "")
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av)
    })
    return copy
  }, [rows, sortKey, sortDir])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, page, pageSize])

  function toggleSort(key: keyof Exercise) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
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
    <div className="w-full">
      <div className="px-4 py-6">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
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
              onClick={() => setShowAdd(true)}
              variant="outline"
              size="sm"
              className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          {/* Table */}
          <div className="px-4 py-4">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full table-fixed border-collapse">
                <thead className="bg-gray-50 text-left">
                  <tr className="text-sm text-gray-700">
                    <TableHeaderCell
                      label="Activity Type"
                      active={sortKey === "activityType"}
                      dir={sortDir}
                      onClick={() => toggleSort("activityType")}
                    />
                    <TableHeaderCell
                      label="Duration"
                      active={sortKey === "duration"}
                      dir={sortDir}
                      onClick={() => toggleSort("duration")}
                    />
                    <TableHeaderCell
                      label="Frequency"
                      active={sortKey === "frequency"}
                      dir={sortDir}
                      onClick={() => toggleSort("frequency")}
                    />
                    <TableHeaderCell
                      label="Intensity"
                      active={sortKey === "intensity"}
                      dir={sortDir}
                      onClick={() => toggleSort("intensity")}
                    />
                    <TableHeaderCell
                      label="Assigned/Saved"
                      active={sortKey === "assignedOrSaved"}
                      dir={sortDir}
                      onClick={() => toggleSort("assignedOrSaved")}
                    />
                    <TableHeaderCell label="Action" noSort />
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {pageItems.map((m) => (
                    <tr key={m.id} className="text-gray-700">
                      <td className="px-4 py-4 truncate">{m.activityType}</td>
                      <td className="px-4 py-4">{m.duration}</td>
                      <td className="px-4 py-4">{m.frequency}</td>
                      <td className="px-4 py-4">{m.intensity}</td>
                      <td className="px-4 py-4">{m.assignedOrSaved}</td>
                      <td className="px-4 py-4">
                        <Button
                          type="button"
                          onClick={() => setViewing(m)}
                          variant="outline"
                          size="icon"
                          className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                          aria-label={`View ${m.activityType}`}
                          title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
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
