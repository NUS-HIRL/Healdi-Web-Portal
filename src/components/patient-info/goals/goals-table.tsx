'use client'

import { flexRender, type ColumnDef } from '@tanstack/react-table'
import type { Goal } from '@/types/goal'
import type { PaginatedResponse } from '@/types/response'
import useDataTable from '@/hooks/use-data-table'

interface GoalsTableProps {
  results: PaginatedResponse<Goal>
  columns: ColumnDef<Goal>[]
  pagination: { pageIndex: number; pageSize: number }
  setPagination: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>
  error?: unknown
}

export function GoalsTable({ results, columns, pagination, setPagination, error }: GoalsTableProps) {
  const { table } = useDataTable<Goal>(results, columns, pagination, setPagination, error)
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="relative w-full overflow-x-auto">
        <table className="w-full caption-bottom text-sm bg-white">
          <thead className="[&_tr]:border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="hover:bg-muted/50 border-b transition-colors">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="hover:bg-muted/50 border-b transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 align-middle whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
