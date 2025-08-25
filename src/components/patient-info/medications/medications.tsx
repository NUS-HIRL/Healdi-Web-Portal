"use client"

import { useState } from "react"

import { MedicationColumns } from "@/components/columns/medication-columns"
import CustomDataTable from "@/components/common/table/custom-data-table"
import { Button } from "@/components/ui/button"
import usePagination from "@/hooks/use-pagination"
import { Medication } from "@/types/medication"
import { LabeledInput } from "../../common/labeled-input"
import { Modal } from "../../common/modal"
import { MedicationDetailsSidebar } from "./medication-details-sidebar"
import { HeaderWithOptions } from "@/components/common/table/header-with-options"

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
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null)
  const [showSelectedMedication, setShowSelectedMedication] = useState(false)

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
    setShowSelectedMedication(false)
    setForm({ name: "", dosage: "", type: "Tablet", creator: "Patient" })
  }

  const handleViewMedication = (medication: Medication) => {
    setSelectedMedication(medication)
    setShowSelectedMedication(true)
  }

  const handleCloseView = () => {
    setShowSelectedMedication(false)
    setSelectedMedication(null)
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
      <HeaderWithOptions title="Medications" to="/patient/medication/add" />

      {/* Header */}
      <div className="py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Medication Plans
        </h3>

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
      </div>

      {selectedMedication && (
        <MedicationDetailsSidebar
          medication={selectedMedication}
          isOpen={showSelectedMedication}
          onClose={handleCloseView}
        />
      )}
    </div>
  )
}
