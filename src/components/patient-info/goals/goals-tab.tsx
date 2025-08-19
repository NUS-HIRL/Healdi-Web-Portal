'use client'

import { useState, useMemo, useEffect } from 'react'
import { Plus, Eye, ArrowUpDown } from 'lucide-react'
import { Goal } from '@/types/goal'
import { Button } from '@/components/ui/button'
import { GoalsTable } from './goals-table'
import { Pagination as CommonPagination } from '@/components/common/pagination'
import { GoalDetailsSidebar } from './goal-details-sidebar'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

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
    coins: 30,
    bonus: 50,
    progress: '2/2'
  },
  {
    id: '3',
    category: 'Physical Activity',
    completionType: 'Short Term',
    title: 'I will cycle for 30 minutes two times a week.',
    description: 'Cycle for at least 30 minutes two times a week.',
    coins: 40,
    bonus: 50,
    progress: '2/2'
  },
  {
    id: '4',
    category: 'Physical Activity',
    completionType: 'Short Term',
    title: 'I will cycle for 30 minutes two times a week.',
    description: 'Cycle for at least 30 minutes two times a week.',
    coins: 10,
    bonus: 50,
    progress: '2/2'
  },
]

export function GoalsTab() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [openPageSize, setOpenPageSize] = useState(false)

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
  }, [])

  // Page changes handled via CommonPagination adapter below

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

  // Build TanStack columns with manual header click sorting
  const columns: ColumnDef<Goal>[] = [
    {
      accessorKey: 'category',
      header: () => (
        <button
          className="flex items-center gap-1 font-medium text-gray-900 hover:text-gray-700"
          onClick={() => handleSortingChange('category')}
        >
          <span>Category</span>
          <ArrowUpDown className={`h-4 w-4 ${sorting.column === 'category' ? 'text-gray-700' : 'text-gray-400'}`} />
        </button>
      ),
      cell: ({ row }) => (
        <Badge variant="secondary" className="bg-orange-100 text-red-500 border-pink-200">
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: 'completionType',
      header: () => (
        <button
          className="flex items-center gap-1 font-medium text-gray-900 hover:text-gray-700"
          onClick={() => handleSortingChange('completionType')}
        >
          <span>Completion Type</span>
          <ArrowUpDown className={`h-4 w-4 ${sorting.column === 'completionType' ? 'text-gray-700' : 'text-gray-400'}`} />
        </button>
      ),
    },
    {
      accessorKey: 'title',
      header: () => (
        <button
          className="flex items-center gap-1 font-medium text-gray-900 hover:text-gray-700"
          onClick={() => handleSortingChange('title')}
        >
          <span>Title</span>
          <ArrowUpDown className={`h-4 w-4 ${sorting.column === 'title' ? 'text-gray-700' : 'text-gray-400'}`} />
        </button>
      ),
    },
    {
      accessorKey: 'description',
      header: () => (
        <button
          className="flex items-center gap-1 font-medium text-gray-900 hover:text-gray-700"
          onClick={() => handleSortingChange('description')}
        >
          <span>Description</span>
          <ArrowUpDown className={`h-4 w-4 ${sorting.column === 'description' ? 'text-gray-700' : 'text-gray-400'}`} />
        </button>
      ),
    },
    {
      accessorKey: 'coins',
      header: () => (
        <button
          className="flex items-center gap-1 font-medium text-gray-900 hover:text-gray-700"
          onClick={() => handleSortingChange('coins')}
        >
          <span>Coins</span>
          <ArrowUpDown className={`h-4 w-4 ${sorting.column === 'coins' ? 'text-gray-700' : 'text-gray-400'}`} />
        </button>
      ),
    },
    {
      accessorKey: 'bonus',
      header: () => (
        <button
          className="flex items-center gap-1 font-medium text-gray-900 hover:text-gray-700"
          onClick={() => handleSortingChange('bonus')}
        >
          <span>Bonus</span>
          <ArrowUpDown className={`h-4 w-4 ${sorting.column === 'bonus' ? 'text-gray-700' : 'text-gray-400'}`} />
        </button>
      ),
    },
    {
      accessorKey: 'progress',
      header: () => (
        <button
          className="flex items-center gap-1 font-medium text-gray-900 hover:text-gray-700"
          onClick={() => handleSortingChange('progress')}
        >
          <span>Progress</span>
          <ArrowUpDown className={`h-4 w-4 ${sorting.column === 'progress' ? 'text-gray-700' : 'text-gray-400'}`} />
        </button>
      ),
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 border-blue-300 hover:bg-blue-200"
          onClick={() => handleViewGoal(row.original)}
        >
          <Eye size={16} className="text-blue-600" />
        </Button>
      ),
      enableSorting: false,
    },
  ]

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
  }, [sorting])

  // Mock results shaped as PaginatedResponse to satisfy the hook
  const results = useMemo(() => {
    const totalCount = sortedGoals.length
    const totalPages = Math.ceil(totalCount / pagination.pageSize)
    const startIndex = pagination.pageIndex * pagination.pageSize
    const endIndex = startIndex + pagination.pageSize
    const data = sortedGoals.slice(startIndex, endIndex)
    return { data, totalCount, page: pagination.pageIndex + 1, totalPages }
  }, [sortedGoals, pagination])


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
              results={results}
              columns={columns}
              pagination={pagination}
              setPagination={setPagination}
            />

            {/* Pagination */}
            <CommonPagination
              page={pagination.pageIndex + 1}
              pageCount={results.totalPages}
              pageSize={pagination.pageSize}
              openPageSize={openPageSize}
              setPage={(updater) => {
                const currentPage = pagination.pageIndex + 1
                const next = typeof updater === 'function' ? (updater as (p: number) => number)(currentPage) : updater
                setPagination(prev => ({ ...prev, pageIndex: Math.max(0, next - 1) }))
              }}
              setPageSize={(updater) => {
                const next = typeof updater === 'function' ? (updater as (s: number) => number)(pagination.pageSize) : updater
                setPagination(prev => ({ ...prev, pageSize: next, pageIndex: 0 }))
              }}
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
  );
}