"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Table } from "@tanstack/react-table"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

type PaginationState = { pageIndex: number; pageSize: number }

type DataTablePaginationProps<T> = {
  table: Table<T>
  pagination: PaginationState
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
}

const DataTablePagination = <T,>({
  table,
  pagination,
  setPagination
}: DataTablePaginationProps<T>) => {
  const [isPageSizeSelectionOpen, setIsPageSizeSelectionOpen] = useState(false)

  const pageSizes = [5, 10, 20]

  return (
    <div
      className={cn("flex items-center justify-end space-x-4 py-4 flex-wrap")}>
      <div className="flex items-center justify-right space-x-2 max-xs:mt-2">
        <Button
          type="button"
          onClick={() => {
            table.previousPage()
            setPagination((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex - 1
            }))
          }}
          disabled={!table.getCanPreviousPage()}
          variant="outline"
          size="icon"
          className="text-gray-500"
          aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="min-w-[2rem] bg-gray-100 text-gray-700"
          aria-current="page"
          disabled>
          {pagination.pageIndex}
        </Button>

        <Button
          type="button"
          onClick={() => {
            table.nextPage()
            setPagination((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex + 1
            }))
          }}
          disabled={!table.getCanNextPage()}
          variant="outline"
          size="icon"
          className="text-gray-600"
          aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="relative">
          <Button
            type="button"
            onClick={() => setIsPageSizeSelectionOpen((prev) => !prev)}
            variant="outline"
            size="sm"
            className="gap-1 text-gray-700"
            aria-haspopup="listbox">
            {pagination.pageSize} / page
            <ChevronDown className="h-4 w-4" />
          </Button>

          {isPageSizeSelectionOpen && (
            <div
              className="absolute right-0 z-10 mt-1 w-28 overflow-hidden rounded-md border border-gray-200 bg-white shadow"
              role="listbox">
              {pageSizes.map((pageSize) => (
                <Button
                  key={pageSize}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPagination({ pageIndex: 0, pageSize: pageSize })
                    setIsPageSizeSelectionOpen(false)
                  }}
                  className={`w-full justify-start px-3 ${
                    pageSize === pagination.pageSize ? "bg-gray-100" : ""
                  }`}
                  role="option"
                  aria-selected={pageSize === pagination.pageSize}>
                  {pageSize} / page
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DataTablePagination
