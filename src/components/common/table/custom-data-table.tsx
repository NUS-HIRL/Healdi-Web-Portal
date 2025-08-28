import useDataTable from "@/hooks/use-data-table"
import { cn } from "@/lib/utils"
import { PaginatedResponse, PaginationKeys } from "@/types/response"
import { ColumnDef, flexRender } from "@tanstack/react-table"
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable
} from "../../ui/table"
import { LoadingSpinner } from "../loading-spinner"
import DataTablePagination from "./data-table-pagination"

export interface CustomDataTableProps<T> {
  data: PaginatedResponse<T>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  columns: ColumnDef<T>[]
  pagination: { pageIndex: number; pageSize: number }
  setPagination: React.Dispatch<
    React.SetStateAction<{ pageIndex: number; pageSize: number }>
  >
  setCurrentPaginationTokenAndPageIndex: (
    isNextPage: boolean,
    newCurrentPaginationToken: string
  ) => void
  paginationToken: PaginationKeys
  isLoading: boolean
  hidePagination?: boolean | undefined // For pages that have customised pagination layouts
}

const CustomDataTable = <T,>({
  data,
  error,
  columns,
  pagination,
  setPagination,
  setCurrentPaginationTokenAndPageIndex,
  paginationToken,
  isLoading,
  hidePagination
}: CustomDataTableProps<T>) => {
  const { table } = useDataTable(
    data,
    columns,
    pagination,
    setPagination,
    error
  )

  return (
    <div className={cn("py-2 max-w-screen")}>
      <div
        className={cn(
          "relative flex flex-1 flex-col overflow-x-auto rounded-md border"
        )}>
        <UITable className={cn("h-[500px]")}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap bg-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel()?.rows &&
            table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn("whitespace-nowrap bg-white py-4")}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  {/* Show a skeleton loader to prevent UI flicker */}
                  {isLoading ? <LoadingSpinner /> : "No Results."}{" "}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
      {hidePagination ? (
        <> </>
      ) : (
        <DataTablePagination
          pagination={pagination}
          setPagination={setPagination}
          paginationToken={paginationToken}
          setCurrentPaginationTokenAndPageIndex={
            setCurrentPaginationTokenAndPageIndex
          }
        />
      )}
    </div>
  )
}

export default CustomDataTable
