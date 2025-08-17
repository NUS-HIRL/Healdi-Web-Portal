'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface GoalsPaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function GoalsPagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange
}: GoalsPaginationProps) {
  return (
    <div className="px-6 py-3 border-t border-gray-200">
      <div className="flex items-center justify-end">
        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &lt;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i).map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => onPageChange(pageIndex)}
              className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                currentPage === pageIndex
                  ? 'border-blue-500 text-blue-600 bg-white'
                  : 'border-transparent text-gray-700 hover:text-gray-900'
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &gt;
          </button>
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center space-x-2 ml-4">
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-28 bg-white border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 / page</SelectItem>
              <SelectItem value="10">10 / page</SelectItem>
              <SelectItem value="25">25 / page</SelectItem>
              <SelectItem value="50">50 / page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
