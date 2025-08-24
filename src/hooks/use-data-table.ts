import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"
import { useEffect, useState } from "react"

import { PaginatedResponse } from "@/types/response"

const useDataTable = <T>(
  results: PaginatedResponse<T>,
  columns: ColumnDef<T>[],
  pagination: { pageIndex: number; pageSize: number },
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >,
  error?: unknown
) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [showIdColumn, setShowIdColumn] = useState<boolean>(false)

  const typeSafeResults =
    error || !results
      ? {
          data: [],
          totalCount: 0,
          page: 0,
          totalPages: 0
        }
      : results

  // Sync column visibility with the showIdColumn toggle
  useEffect(() => {
    setColumnVisibility((prev) => ({
      ...prev,
      id: showIdColumn
    }))
  }, [showIdColumn])

  const table = useReactTable({
    data: typeSafeResults.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualSorting: true,
    manualPagination: true,
    rowCount: typeSafeResults.totalCount,
    pageCount: typeSafeResults.totalPages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    }
  })

  return {
    table,
    setSorting,
    setColumnFilters,
    setColumnVisibility,
    setRowSelection,
    pagination,
    setPagination,
    showIdColumn,
    toggleIdColumn: setShowIdColumn
  }
}

export default useDataTable
