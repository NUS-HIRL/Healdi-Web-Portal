"use client"

import { Eye, Plus } from "lucide-react"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { KeyValueRow } from "../../common/key-value-row"
import { LabeledInput } from "../../common/labeled-input"
import { Modal } from "../../common/modal"
import { TableHeaderCell } from "../../common/table-header-cell"
import usePagination from "@/hooks/use-pagination"
import { Medication } from "@/types/medication"
import { MedicationColumns } from "@/components/columns/medication-columns"
import CustomDataTable from "@/components/common/table/custom-data-table"

const INITIAL_DATA: Medication[] = [
  {
    id: "1",
    name: "Propranolol Hydrochloride",
    dosage: "500 mg",
    type: "Tablet",
    creator: "Patient"
  },
  {
    id: "2",
    name: "Amiloride Hydrochloride / Hydrochlorothiazide",
    dosage: "5 / 50 mg",
    type: "Tablet",
    creator: "Patient"
  },
  {
    id: "3",
    name: "Metformin",
    dosage: "500 mg",
    type: "Tablet",
    creator: "Patient"
  },
  {
    id: "4",
    name: "Paracetamol",
    dosage: "N/A",
    type: "Tablet",
    creator: "Patient"
  }
]

type MedForm = {
  name: string
  dosage: string
  type: "Tablet" | "Capsule" | "Injection"
  creator: "Patient" | "Doctor"
}

export const Medications = () => {
  const [rows, setRows] = useState<Medication[]>(INITIAL_DATA)

  // pagination
  const { pagination, setPagination } = usePagination()

  // modals
  const [viewing, setViewing] = useState<Medication | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  // add form (dummy)
  const [form, setForm] = useState<MedForm>({
    name: "",
    dosage: "",
    type: "Tablet",
    creator: "Patient"
  })

  function handleAdd() {
    if (!form.name.trim()) {
      alert("Enter a medication name (dummy validation).")
      return
    }
    const newRow: Medication = {
      id: String(Date.now()),
      name: form.name.trim(),
      dosage: form.dosage.trim() || "N/A",
      type: form.type,
      creator: form.creator
    }
    setRows((r) => [newRow, ...r])
    setShowAdd(false)
    setForm({ name: "", dosage: "", type: "Tablet", creator: "Patient" })
  }

  const handleViewMedication = (medication: Medication) => {
    setViewing(medication)
    setShowAdd(true)
  }

  const columns = MedicationColumns({ onViewMedication: handleViewMedication })

  const MedicationTable = CustomDataTable<Medication>

  // TODO: Change this mock data to API fetched data
  const results = {
    data: rows,
    totalCount: rows.length,
    page: 1,
    totalPages: Math.ceil(rows.length / pagination.pageSize)
  }

  return (
    <div className="w-full px-4 py-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200">
        Medications
      </h1>

      {/* Card */}
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-gray-800 font-semibold">Medication Plan</h2>
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
      {/* TODO: Replace isLoading and error hardcodes after integratin medication API */}
      <MedicationTable
        columns={columns}
        data={results}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={false}
        error={null}
      />

      {/* View Modal (dummy) */}
      {viewing && (
        <Modal onClose={() => setViewing(null)} title="Medication Details">
          <div className="space-y-2 text-sm">
            <KeyValueRow label="Medication Name" value={viewing.name} />
            <KeyValueRow label="Dosage" value={viewing.dosage} />
            <KeyValueRow label="Type" value={viewing.type} />
            <KeyValueRow label="Creator" value={viewing.creator} />
          </div>
        </Modal>
      )}

      {/* Add Modal (dummy) */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)} title="Add Medication">
          <div className="space-y-3">
            <LabeledInput
              label="Medication Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Atorvastatin"
            />
            <LabeledInput
              label="Dosage"
              value={form.dosage}
              onChange={(e) =>
                setForm((f) => ({ ...f, dosage: e.target.value }))
              }
              placeholder="e.g. 20 mg"
            />
            <LabeledInput
              label="Type"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              placeholder="e.g. Tablet"
            />
            <LabeledInput
              label="Creator"
              value={form.creator}
              onChange={(e) =>
                setForm((f) => ({ ...f, creator: e.target.value }))
              }
              placeholder="e.g. Patient"
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
