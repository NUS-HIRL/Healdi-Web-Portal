'use client'

import { Eye, ChevronUp, ChevronDown } from 'lucide-react'
import { Goal } from '@/types/goal'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface GoalsTableProps {
  goals: Goal[]
  onSort: (columnKey: string) => void
  sorting: {
    column: string | null
    direction: 'asc' | 'desc' | null
  }
  onViewGoal: (goal: Goal) => void
}

export function GoalsTable({ goals, onSort, sorting, onViewGoal }: GoalsTableProps) {
  // Helper function to get sort icon
  const getSortIcon = (columnKey: string) => {
    if (sorting.column !== columnKey) {
      return (
        <div className="flex flex-col ml-1">
          <ChevronUp size={12} className="text-gray-400" />
          <ChevronDown size={12} className="text-gray-400" />
        </div>
      )
    }

    if (sorting.direction === 'asc') {
      return <ChevronUp size={12} className="text-blue-600" />
    } else if (sorting.direction === 'desc') {
      return <ChevronDown size={12} className="text-blue-600" />
    }

    return (
      <div className="flex flex-col ml-1">
        <ChevronUp size={12} className="text-gray-400" />
        <ChevronDown size={12} className="text-gray-400" />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                className="flex items-center space-x-1 font-medium text-gray-900 hover:text-gray-700 ml-2"
                onClick={() => onSort("category")}
              >
                <span>Category</span>
                {getSortIcon("category")}
              </button>
            </TableHead>
            <TableHead>
              <button
                className="flex items-center space-x-1 font-medium text-gray-900 hover:text-gray-700 ml-2"
                onClick={() => onSort("completionType")}
              >
                <span>Completion Type</span>
                {getSortIcon("completionType")}
              </button>
            </TableHead>
            <TableHead>
              <button
                className="flex items-center space-x-1 font-medium text-gray-900 hover:text-gray-700 ml-2"
                onClick={() => onSort("title")}
              >
                <span>Title</span>
                {getSortIcon("title")}
              </button>
            </TableHead>
            <TableHead>
              <button
                className="flex items-center space-x-1 font-medium text-gray-900 hover:text-gray-700 ml-2"
                onClick={() => onSort("description")}
              >
                <span>Description</span>
                {getSortIcon("description")}
              </button>
            </TableHead>
            <TableHead>
              <button
                className="flex items-center space-x-1 font-medium text-gray-900 hover:text-gray-700 ml-2"
                onClick={() => onSort("coins")}
              >
                <span>Coins</span>
                {getSortIcon("coins")}
              </button>
            </TableHead>
            <TableHead>
              <button
                className="flex items-center space-x-1 font-medium text-gray-900 hover:text-gray-700 ml-2"
                onClick={() => onSort("bonus")}
              >
                <span>Bonus</span>
                {getSortIcon("bonus")}
              </button>
            </TableHead>
            <TableHead>
              <button
                className="flex items-center space-x-1 font-medium text-gray-900 hover:text-gray-700 ml-2"
                onClick={() => onSort("progress")}
              >
                <span>Progress</span>
                {getSortIcon("progress")}
              </button>
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-red-500 border-pink-200 ml-2"
                >
                  {goal.category}
                </Badge>
              </TableCell>
              <TableCell>{goal.completionType}</TableCell>
              <TableCell className="max-w-xs">{goal.title}</TableCell>
              <TableCell className="max-w-xs">
                {goal.description}
              </TableCell>
              <TableCell>{goal.coins}</TableCell>
              <TableCell>{goal.bonus}</TableCell>
              <TableCell>{goal.progress}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 border-blue-300 hover:bg-blue-200"
                  onClick={() => onViewGoal(goal)}
                >
                  <Eye size={16} className="text-blue-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
