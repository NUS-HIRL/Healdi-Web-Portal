"use client"

import { useEffect, useMemo, useState } from "react"
import { MedicationTableValue } from "@/types/medication"
import CustomDataTable from "@/components/common/table/custom-data-table"
import { PatientPagination } from "../patient-pagination"
import { MedicationColumns } from "@/components/columns/medication-columns"

// TODO: Remove once data from API comes in
export const medications: MedicationTableValue[] = [
  {
    id: "m1",
    name: "Captopril",
    dosage: "25 mg",
    type: "Tablet",
    custom: false,
    selected: true
  },
  {
    id: "m2",
    name: "Lisinopril",
    dosage: "40 mg",
    type: "Tablet",
    custom: false,
    selected: true
  },
  {
    id: "m3",
    name: "Metformin",
    dosage: "500 mg",
    type: "Tablet",
    custom: false,
    selected: false
  },
  {
    id: "m4",
    name: "Gliclazide MR",
    dosage: "30 mg",
    type: "Tablet",
    custom: false,
    selected: true
  },
  {
    id: "m5",
    name: "Pioglitazone",
    dosage: "30 mg",
    type: "Tablet",
    custom: false,
    selected: false
  },
  {
    id: "m6",
    name: "Glucovance [Metformin/Glibenclamide]",
    dosage: "500 mg / 2.5 mg",
    type: "Tablet",
    custom: false,
    selected: true
  },
  {
    id: "m7",
    name: "Clopidogrel",
    dosage: "75 mg",
    type: "Tablet",
    custom: false,
    selected: true
  },
  {
    id: "m8",
    name: "Ticlopidine HCl",
    dosage: "250 mg",
    type: "Tablet",
    custom: false,
    selected: false
  },
  {
    id: "m9",
    name: "Amoxicillin",
    dosage: "500 mg",
    type: "Capsule",
    custom: false,
    selected: false
  },
  {
    id: "m10",
    name: "Paracetamol Syrup",
    dosage: "250 mg/5 mL",
    type: "Syrup",
    custom: true,
    selected: true
  },
  {
    id: "m11",
    name: "Insulin Glargine",
    dosage: "10 units",
    type: "Injection",
    custom: false,
    selected: false
  },
  {
    id: "m12",
    name: "Timolol Eye Drops",
    dosage: "0.5%",
    type: "Drops",
    custom: false,
    selected: true
  },
  {
    id: "m13",
    name: "Nitroglycerin Patch",
    dosage: "0.2 mg/hr",
    type: "Patch",
    custom: false,
    selected: false
  },
  {
    id: "m14",
    name: "Salbutamol Inhaler",
    dosage: "100 mcg/puff",
    type: "Other",
    custom: true,
    selected: false
  }
]

export const MedicationList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  
  // TODO: Replace with actual view handler when API integration is done

  // TODO: Remove once sorting is implemented on API side
  const [sorting] = useState<{
    column: string | null
    direction: "asc" | "desc" | null
  }>({
    column: "Medication Name",
    direction: "asc"
  })

  // Reset to first page when patients data changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [])

  // Handle page changes
  const handlePageChange = (newPageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: newPageIndex
    }))
  }

  // TODO: Remove once sorting is implemented on API side
  const sortedMedications = useMemo(() => {
    const list: MedicationTableValue[] = Array.isArray(medications)
      ? medications
      : ((medications as { data?: MedicationTableValue[] } | undefined)?.data ??
        [])

    if (!sorting.column || !sorting.direction) return list.slice()

    const col = sorting.column as keyof MedicationTableValue
    const dir = sorting.direction === "asc" ? 1 : -1

    return [...list].sort((a, b) => {
      const av = a[col]
      const bv = b[col]

      if (typeof av === "number" && typeof bv === "number") {
        return (av - bv) * dir
      }
      return String(av ?? "").localeCompare(String(bv ?? "")) * dir
    })
  }, [sorting])

  // TODO: Remove once pagination is implemented on API side
  // Calculate pagination data from sorted patients
  const totalCount = sortedMedications.length
  const totalPages = Math.ceil(totalCount / pagination.pageSize)
  const startIndex = pagination.pageIndex * pagination.pageSize
  const endIndex = startIndex + pagination.pageSize
  const currentPageData = sortedMedications.slice(startIndex, endIndex)

  const MedicationTable = CustomDataTable<MedicationTableValue>

  // TODO: Change this mock data to API fetched data
  const results = {
    data: currentPageData,
    totalCount: currentPageData.length,
    page: 1,
    totalPages: Math.ceil(currentPageData.length / pagination.pageSize)
  }

  const columns = useMemo(
    () => MedicationColumns({ onViewMedication: () => null }),
    []
  )

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Medication List</h2>
      {/* TODO: Replace hardcoded isLoading and error once API is done */}
      <MedicationTable
        data={results}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={false}
        error={null}
        hidePagination={true} // Custom pagination layout
      />

      <PatientPagination
        currentPage={pagination.pageIndex}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
