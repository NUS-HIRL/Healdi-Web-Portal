"use client"

import CustomDataTable from "@/components/common/table/custom-data-table"
import { HeaderWithOptions } from "@/components/common/table/header-with-options"
import fetcher from "@/lib/fetcher"
import { ApiGoal, Goal } from "@/types/goal"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { GoalColumns } from "../../columns/goal-columns"
import { GoalDetailsSidebar } from "./goal-details-sidebar"

interface GoalsTabProps {
  patientId: string
}

export const GoalsTab = ({ patientId }: GoalsTabProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

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

  // TODO: Ze Kai: Modify once API data comes through, no longer need useMemo as useSWR handles it
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

  // TODO: Ze Kai: Remove once API data comes through
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

  // TODO: Change this mock data to API fetched data
  const results = {
    data: sortedGoals,
    totalCount: goals.length,
    page: 1,
    totalPages: Math.ceil(goals.length / pagination.pageSize)
  }

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
              data={results}
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
