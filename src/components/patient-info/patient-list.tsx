"use client"

import { Patient } from "@/types/patient"
import { useEffect, useMemo, useState } from "react"
import { PatientInfoColumns } from "../columns/patient-info-columns"
import CustomDataTable from "../common/table/custom-data-table"
import { PatientPagination } from "./patient-pagination"

// TODO: Remove once data from API comes in
const patients: Patient[] = [
  {
    id: "1",
    patientUid: "RES0001",
    age: 56,
    gender: "M",
    fitnessLevel: "High",
    hrv: 65,
    healthConditions: ["Hypertension"],
    goals: ["Lower BP", "10k steps/day"]
  },
  {
    id: "2",
    patientUid: "RES0002",
    age: 50,
    gender: "F",
    fitnessLevel: "Moderate",
    hrv: 42,
    healthConditions: ["Hypertension", "Obesity"],
    goals: ["Weight loss", "Improve fitness"]
  },
  {
    id: "3",
    patientUid: "RES0003",
    age: 75,
    gender: "F",
    fitnessLevel: "Low",
    hrv: 42,
    healthConditions: ["Prehypertension"],
    goals: ["Stress reduction"]
  },
  {
    id: "4",
    patientUid: "RES0004",
    age: 45,
    gender: "M",
    fitnessLevel: "High",
    hrv: 78,
    healthConditions: ["Diabetes"],
    goals: ["Blood sugar control", "Weight management"]
  },
  {
    id: "5",
    patientUid: "RES0005",
    age: 62,
    gender: "F",
    fitnessLevel: "Moderate",
    hrv: 55,
    healthConditions: ["Hypertension", "Arthritis"],
    goals: ["Pain management", "Mobility improvement"]
  },
  {
    id: "6",
    patientUid: "RES0006",
    age: 38,
    gender: "M",
    fitnessLevel: "High",
    hrv: 82,
    healthConditions: ["Asthma"],
    goals: ["Respiratory health", "Endurance building"]
  },
  {
    id: "7",
    patientUid: "RES0007",
    age: 55,
    gender: "F",
    fitnessLevel: "Low",
    hrv: 38,
    healthConditions: ["Heart Disease"],
    goals: ["Cardiac rehabilitation", "Lifestyle changes"]
  },
  {
    id: "8",
    patientUid: "RES0008",
    age: 42,
    gender: "M",
    fitnessLevel: "Moderate",
    hrv: 48,
    healthConditions: ["Obesity"],
    goals: ["Weight loss", "Muscle building"]
  },
  {
    id: "9",
    patientUid: "RES0009",
    age: 68,
    gender: "F",
    fitnessLevel: "Low",
    hrv: 45,
    healthConditions: ["Osteoporosis"],
    goals: ["Bone strength", "Balance improvement"]
  },
  {
    id: "10",
    patientUid: "RES0010",
    age: 35,
    gender: "M",
    fitnessLevel: "High",
    hrv: 75,
    healthConditions: ["Anxiety"],
    goals: ["Stress management", "Mental wellness"]
  },
  {
    id: "11",
    patientUid: "RES0011",
    age: 35,
    gender: "M",
    fitnessLevel: "High",
    hrv: 75,
    healthConditions: ["Anxiety"],
    goals: ["Stress management", "Mental wellness"]
  },
  {
    id: "12",
    patientUid: "RES0012",
    age: 35,
    gender: "M",
    fitnessLevel: "High",
    hrv: 75,
    healthConditions: ["Anxiety"],
    goals: ["Stress management", "Mental wellness"]
  }
]

export const PatientList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  // TODO: Remove once sorting is implemented on API side
  const [sorting] = useState<{
    column: string | null
    direction: "asc" | "desc" | null
  }>({
    column: "patientUid",
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
  }, [sorting])

  // TODO: Remove once pagination is implemented on API side
  // Calculate pagination data from sorted patients
  const totalCount = sortedPatients.length
  const totalPages = Math.ceil(totalCount / pagination.pageSize)
  const startIndex = pagination.pageIndex * pagination.pageSize
  const endIndex = startIndex + pagination.pageSize
  const currentPageData = sortedPatients.slice(startIndex, endIndex)

  const columns = PatientInfoColumns()

  const PatientTable = CustomDataTable<Patient>

  // TODO: Change this mock data to API fetched data
  const results = {
    data: currentPageData,
    totalCount: currentPageData.length,
    page: 1,
    totalPages: Math.ceil(currentPageData.length / pagination.pageSize)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Patient List</h2>
      {/* TODO: Replace hardcoded isLoading and error once API is done */}
      <PatientTable
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
