"use client"

import CustomDataTable from "@/components/common/table/custom-data-table"
import { HeaderWithOptions } from "@/components/common/table/header-with-options"
import usePagination from "@/hooks/use-pagination"
import fetcher from "@/lib/fetcher"
import { buildDefaultPaginatedData } from "@/lib/utils"
import { Goal } from "@/types/goal"
import { PaginatedResponse } from "@/types/response"
import { useState } from "react"
import useSWR from "swr"
import { GoalColumns } from "../../columns/goal-columns"
import { GoalDetailsSidebar } from "./goal-details-sidebar"

interface GoalsTabProps {
  patientId: string // TODO: Kervyn: Might need to change this all to username (for all modules)
}

export const GoalsTab = ({ patientId }: GoalsTabProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const { paginationToken, setPaginationToken } = usePagination()

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const {
    data: response = buildDefaultPaginatedData(),
    error,
    isLoading
  } = useSWR<PaginatedResponse<Goal>>(
    `v1/users/${encodeURIComponent(patientId)}/goals?limit=${pagination.pageSize}&token=${paginationToken}`,
    fetcher
  )

  const [sorting, setSorting] = useState<{
    column: string | null
    direction: "asc" | "desc" | null
  }>({
    column: null,
    direction: null
  })

  const handleSortingChange = (column: string) => {
    setSorting((prev) => {
      if (prev.column === column) {
        // Toggle direction if same column
        if (prev.direction === "asc") return { column, direction: "desc" }
        if (prev.direction === "desc") return { column, direction: null }
        return { column, direction: "asc" }
      } else {
        // New column, start with ascending
        return { column, direction: "asc" }
      }
    })

    // Reset to first page when sorting changes
    setPagination((prev) => ({
      ...prev,
      pageIndex: 1
    }))
  }

  // Handle view button click
  const handleViewGoal = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsViewOpen(true)
  }

  // Create columns using the imported column factory
  const columns = GoalColumns({
    onSortingChange: handleSortingChange,
    onViewGoal: handleViewGoal,
    sorting: sorting
  })

  // Handle close view
  const handleCloseView = () => {
    setIsViewOpen(false)
    setSelectedGoal(null)
  }

  const GoalsTable = CustomDataTable<Goal>

  return (
    <div className="bg-gray-100">
      {/* Goals Section */}
      <div className="px-6 pb-6">
        <div className="bg-gray-100">
          {/* Section Header */}
          <HeaderWithOptions title="Goals" to="/patient-info/goals/add" />

          {/* Goals Table */}
          <div className="py-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assigned Goals
            </h3>

            <GoalsTable
              data={response}
              columns={columns}
              pagination={{ pageIndex: 0, pageSize: pagination.pageSize }}
              error={error}
              isLoading={isLoading}
              setPagination={setPagination}
            />
          </div>
        </div>
      </div>

      {/* Goal Details Sidebar */}
      <GoalDetailsSidebar
        goal={selectedGoal}
        isOpen={isViewOpen}
        onClose={handleCloseView}
      />
    </div>
  )
}
