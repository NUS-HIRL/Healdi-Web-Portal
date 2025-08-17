'use client'

import { useState, useMemo, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Goal } from '@/types/goal'
import { Button } from '@/components/ui/button'
import { GoalsTable } from './goals-table'
import { GoalsPagination } from './goals-pagination'
import { GoalDetailsSidebar } from './goal-details-sidebar'

// Mock data for demonstration
const mockGoals: Goal[] = [
  {
    id: '1',
    category: 'Physical Activity',
    completionType: 'Short Term',
    title: 'I will jog for 15 minutes three times a week.',
    description: 'Jog for at least 15 minutes three times a week.',
    coins: 20,
    bonus: 50,
    progress: '1/3'
  },
  {
    id: '2',
    category: 'Physical Activity',
    completionType: 'Short Term',
    title: 'I will cycle for 30 minutes two times a week.',
    description: 'Cycle for at least 30 minutes two times a week.',
    coins: 20,
    bonus: 50,
    progress: '2/2'
  },
  {
    id: '3',
    category: 'Physical Activity',
    completionType: 'Short Term',
    title: 'I will cycle for 30 minutes two times a week.',
    description: 'Cycle for at least 30 minutes two times a week.',
    coins: 20,
    bonus: 50,
    progress: '2/2'
  },
  {
    id: '4',
    category: 'Physical Activity',
    completionType: 'Short Term',
    title: 'I will cycle for 30 minutes two times a week.',
    description: 'Cycle for at least 30 minutes two times a week.',
    coins: 20,
    bonus: 50,
    progress: '2/2'
  },
]

export function GoalsTab() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const [sorting, setSorting] = useState<{
    column: string | null;
    direction: 'asc' | 'desc' | null;
  }>({
    column: 'title',
    direction: 'asc'
  })

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Reset to first page when goals data changes
  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }))
  }, [mockGoals])

  // Handle page changes
  const handlePageChange = (newPageIndex: number) => {
    setPagination(prev => ({
      ...prev,
      pageIndex: newPageIndex
    }))
  }

  // Handle sorting
  const handleSortingChange = (columnKey: string) => {
    setSorting(prev => {
      if (prev.column === columnKey) {
        // If same column, cycle through: asc -> desc -> null -> asc
        if (prev.direction === 'asc') {
          return { column: columnKey, direction: 'desc' }
        } else if (prev.direction === 'desc') {
          return { column: columnKey, direction: null }
        } else {
          // prev.direction is null, start with asc
          return { column: columnKey, direction: 'asc' }
        }
      }
      // If different column, start with asc
      return { column: columnKey, direction: 'asc' }
    })
    // Reset to first page when sorting changes
    setPagination(prev => ({ ...prev, pageIndex: 0 }))
  }

  // Sort goals based on current sorting state
  const sortedGoals = useMemo(() => {
    if (!sorting.column || !sorting.direction) {
      return [...mockGoals]
    }

    return [...mockGoals].sort((a, b) => {
      const aValue = a[sorting.column as keyof Goal]
      const bValue = b[sorting.column as keyof Goal]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sorting.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sorting.direction === 'asc' 
          ? aValue - bValue
          : bValue - aValue
      }

      return 0
    })
  }, [mockGoals, sorting])

  // Calculate pagination data from sorted goals
  const totalCount = sortedGoals.length
  const totalPages = Math.ceil(totalCount / pagination.pageSize)
  const startIndex = pagination.pageIndex * pagination.pageSize
  const endIndex = startIndex + pagination.pageSize
  const currentPageData = sortedGoals.slice(startIndex, endIndex)

  // Reset to first page when page size changes
  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }))
  }, [pagination.pageSize])

  // Handle view button click
  const handleViewGoal = (goal: Goal) => {
    setSelectedGoal(goal)
    setIsViewOpen(true)
  }

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
                         // Navigate to add goal page
                         window.location.href = '/patient-info/goals/add'
                       }}
                     >
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
            
            <GoalsTable 
              goals={currentPageData}
              onSort={handleSortingChange}
              sorting={sorting}
              onViewGoal={handleViewGoal}
            />

            {/* Pagination */}
            <GoalsPagination
              currentPage={pagination.pageIndex}
              totalPages={totalPages}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={(newPageSize: number) => 
                setPagination(prev => ({ ...prev, pageSize: newPageSize, pageIndex: 0 }))
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
  );
}