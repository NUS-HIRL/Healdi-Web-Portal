"use client"

import CustomDataTable from "@/components/common/table/custom-data-table"
import { HeaderWithOptions } from "@/components/common/table/header-with-options"
import usePagination from "@/hooks/use-pagination"
import fetcher from "@/lib/fetcher"
import { buildDefaultPaginatedData } from "@/lib/utils"
import { Goal } from "@/types/goal"
import { PaginatedResponse } from "@/types/response"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { GoalColumns } from "../../columns/goal-columns"
import { GoalDetailsSidebar } from "./goal-details-sidebar"

interface GoalsTabProps {
  patientId: string // TODO: Kervyn: Might need to change this all to username (for all modules)
}

export const GoalsTab = ({ patientId }: GoalsTabProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 1
  })

  const {
    currentPaginationToken,
    setCurrentPaginationTokenAndPageIndex,
    paginationToken,
    setPaginationToken
  } = usePagination(pagination, setPagination)

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const {
    data: response = buildDefaultPaginatedData(),
    error,
    isLoading
  } = useSWR<PaginatedResponse<Goal>>(
    `v1/users/${encodeURIComponent(patientId)}/goals?limit=${pagination.pageSize}&token=${currentPaginationToken}`,
    fetcher
  )

  useEffect(() => {
    setPaginationToken(response.pagination)
    // disable to prevent constant re-rendering due to extra dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.pagination])

  // Handle view button click
  const handleViewGoal = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsViewOpen(true)
  }

  // Create columns using the imported column factory
  const columns = GoalColumns({
    onViewGoal: handleViewGoal
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
              pagination={pagination}
              error={error}
              isLoading={isLoading}
              setPagination={setPagination}
              paginationToken={paginationToken}
              setCurrentPaginationTokenAndPageIndex={
                setCurrentPaginationTokenAndPageIndex
              }
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
