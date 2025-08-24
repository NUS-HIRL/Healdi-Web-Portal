"use client"

import { useMemo, useState, useEffect } from "react"
import { Patient } from "@/types/patient"
import { PatientTable, Pagination } from "./table"

interface PatientListProps {
  patients: Patient[]
}

export const PatientList = ({ patients }: PatientListProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const [sorting, setSorting] = useState<{
    column: string | null
    direction: "asc" | "desc" | null
  }>({
    column: "patientUid",
    direction: "asc"
  })

  // Reset to first page when patients data changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [patients])

  // Handle page changes
  const handlePageChange = (newPageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: newPageIndex
    }))
  }

  // Handle sorting
  const handleSortingChange = (columnKey: string) => {
    setSorting((prev) => {
      if (prev.column === columnKey) {
        // If same column, cycle through: asc -> desc -> null -> asc
        if (prev.direction === "asc") {
          return { column: columnKey, direction: "desc" }
        } else if (prev.direction === "desc") {
          return { column: columnKey, direction: null }
        } else {
          // prev.direction is null, start with asc
          return { column: columnKey, direction: "asc" }
        }
      }
      // If different column, start with asc
      return { column: columnKey, direction: "asc" }
    })
    // Reset to first page when sorting changes
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  // Sort patients based on current sorting state
  const sortedPatients = useMemo(() => {
    if (!sorting.column || !sorting.direction) {
      return [...patients]
    }

    return [...patients].sort((a, b) => {
      const aValue = a[sorting.column as keyof Patient]
      const bValue = b[sorting.column as keyof Patient]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sorting.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sorting.direction === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [patients, sorting])

  // Calculate pagination data from sorted patients
  const totalCount = sortedPatients.length
  const totalPages = Math.ceil(totalCount / pagination.pageSize)
  const startIndex = pagination.pageIndex * pagination.pageSize
  const endIndex = startIndex + pagination.pageSize
  const currentPageData = sortedPatients.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Patient List</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <PatientTable patients={currentPageData} onSort={handleSortingChange} />

        <Pagination
          currentPage={pagination.pageIndex}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
