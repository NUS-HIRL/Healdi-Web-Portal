"use client"

import { useState } from "react"

import { MedicationColumns } from "@/components/columns/medication-plan-columns"
import CustomDataTable from "@/components/common/table/custom-data-table"
import { HeaderWithOptions } from "@/components/common/table/header-with-options"
import usePagination from "@/hooks/use-pagination"
import { Medication } from "@/types/medication"
import { MedicationDetailsSidebar } from "./medication-details-sidebar"

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

// TODO: Sai: Fix existing page, it was implemented for Medication Plan but seems like it's for medications instead.
export const Medications = () => {
  const [rows] = useState<Medication[]>(INITIAL_DATA)

  // pagination
  const { pagination, setPagination } = usePagination()

  // modals
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null)
  const [showSelectedMedication, setShowSelectedMedication] = useState(false)

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
      <HeaderWithOptions
        title="Medications"
        to="/patient-info/medication/add"
      />

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
