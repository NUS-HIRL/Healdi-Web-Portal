"use client"

import { useState } from "react"

import { MedicationColumns } from "@/components/columns/medication-columns"
import CustomDataTable from "@/components/common/table/custom-data-table"
import { HeaderWithOptions } from "@/components/common/table/header-with-options"
import usePagination from "@/hooks/use-pagination"
import { Medication } from "@/types/medication"
import { MedicationDetailsSidebar } from "./medication-details-sidebar"
import { PaginatedResponse } from "@/types/response"

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

  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10
  })

  // TODO: Copy goals-tab way of calling the API once ready
  const { setCurrentPaginationTokenAndPageIndex, paginationToken } =
    usePagination(pagination, setPagination)

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
  const results: PaginatedResponse<Medication> = {
    data: rows,
    count: rows.length,
    pagination: {
      next_page_key: null,
      previous_page_key: null
    }
  }

  return (
    <div className="w-full px-4 py-6">
      {/* Title */}
      <HeaderWithOptions
        title="Medications"
        to="/patient-info/medications/add"
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
          paginationToken={paginationToken}
          setCurrentPaginationTokenAndPageIndex={
            setCurrentPaginationTokenAndPageIndex
          }
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
