"use client"

import { Pagination } from "@/components/common/pagination"
import { Button } from "@/components/ui/button"
import fetcher from "@/lib/fetcher"
import { ApiGoal, Goal } from "@/types/goal"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { goalColumns } from "../../columns/goal-columns"
import { GoalDetailsSidebar } from "./goal-details-sidebar"
import { GoalsTable } from "./goals-table"

interface GoalsTabProps {
  patientId: string
}

export const GoalsTab = ({ patientId }: GoalsTabProps) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [openPageSize, setOpenPageSize] = useState(false)

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const {
    data: response,
    error,
    isLoading
  } = useSWR<ApiGoal[]>(
    `v1/users/${encodeURIComponent(patientId)}/goals`,
    fetcher
  )

  const [sorting, setSorting] = useState<{
    column: string | null
    direction: "asc" | "desc" | null
  }>({
    column: null,
    direction: null
  })

  // Transform API data to component data
  const goals: Goal[] = useMemo(() => {
    let goalsData: ApiGoal[] = []

    if (response) {
      // The API returns an array directly
      if (Array.isArray(response)) {
        goalsData = response
      }
    }

    if (goalsData.length === 0) {
      return []
    }

    return goalsData.map((g: ApiGoal) => ({
      id: g.id,
      category: g.goal_category,
      completionType:
        g.completion_type === "short" ? "Short Term" : "Long Term",
      title: g.title,
      description: g.description,
      coins: g.coin_reward_per_completion,
      bonus: g.completion_bonus,
      progress: `${g.completed_count}/${g.target_count}`
    }))
  }, [response])

  // Apply sorting to goals
  const sortedGoals = useMemo(() => {
    const sortedGoals = [...goals]

    if (sorting.column && sorting.direction) {
      sortedGoals.sort((a, b) => {
        let aValue: string | number = a[sorting.column as keyof Goal] as
          | string
          | number
        let bValue: string | number = b[sorting.column as keyof Goal] as
          | string
          | number

        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }

        if (sorting.direction === "asc") {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
    }
    return sortedGoals
  }, [goals, sorting])

  // Handle sorting change
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
    setPage(1)
  }

  // Handle view button click
  const handleViewGoal = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsViewOpen(true)
  }

  // Create columns using the imported column factory
  const columns = goalColumns({
    onSortingChange: handleSortingChange,
    onViewGoal: handleViewGoal,
    sorting: sorting
  })

  // Handle close view
  const handleCloseView = () => {
    setIsViewOpen(false)
    setSelectedGoal(null)
  }

  return (
    <div className="bg-gray-100">
      {/* Goals Section */}
      <div className="px-6 pb-6">
        <div className="bg-gray-100">
          {/* Section Header */}
          <div className="px-2 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Goals</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                onClick={() => {
                  window.location.href = "/patient-info/goals/add"
                }}>
                <Plus size={16} />
                Add
              </Button>
            </div>
          </div>

          {/* Goals Table */}
          <div className="px-2 py-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assigned Goals
            </h3>
            {isLoading && (
              <div className="text-sm text-gray-500 mb-2">Loading goals…</div>
            )}
            {error && (
              <div className="text-sm text-red-600 mb-2">{error.message}</div>
            )}

            <GoalsTable
              results={{
                data: sortedGoals,
                totalCount: goals.length,
                page: 1,
                totalPages: Math.ceil(goals.length / pageSize)
              }}
              columns={columns}
              pagination={{ pageIndex: 0, pageSize: pageSize }}
              setPagination={() => {}}
              error={error?.message ?? undefined}
            />

            {/* Pagination */}
            <Pagination
              page={page}
              pageCount={Math.ceil(goals.length / pageSize)}
              pageSize={pageSize}
              openPageSize={openPageSize}
              setPage={setPage}
              setPageSize={setPageSize}
              setOpenPageSize={setOpenPageSize}
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
