"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Resource } from "@/types/resource"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { TableHeaderCell, SortDir } from "@/components/common/table-header-cell"

interface ResourceColumnsProps {
  onSortingChange: (columnKey: string) => void
  onViewResource: (resource: Resource) => void
  sorting: {
    column: string | null
    direction: SortDir | null
  }
}

export const resourceColumns = ({
  onSortingChange,
  onViewResource,
  sorting
}: ResourceColumnsProps): ColumnDef<Resource>[] => [
  {
    accessorKey: "type",
    header: () => (
      <TableHeaderCell
        label="Type"
        active={sorting.column === "type"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("type")}
        inline={true}
      />
    ),
    cell: ({ row }) => row.original.type
  },
  {
    accessorKey: "source",
    header: () => (
      <TableHeaderCell
        label="Source"
        active={sorting.column === "source"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("source")}
        inline={true}
      />
    ),
    cell: ({ row }) => row.original.source
  },
  {
    accessorKey: "title",
    header: () => (
      <TableHeaderCell
        label="Title"
        active={sorting.column === "title"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("title")}
        inline={true}
      />
    ),
    cell: ({ row }) => (
      <span className="block max-w-[20rem] whitespace-normal break-words">
        {row.original.title}
      </span>
    )
  },
  {
    accessorKey: "assignedOrSaved",
    header: () => (
      <TableHeaderCell
        label="Assigned / Saved"
        active={sorting.column === "assignedOrSaved"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("assignedOrSaved")}
        inline={true}
      />
    ),
    cell: ({ row }) => row.original.assignedOrSaved
  },
  {
    id: "actions",
    header: () => <TableHeaderCell label="Action" noSort inline={true} />,
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 border-blue-300 hover:bg-blue-200"
        onClick={() => onViewResource(row.original)}>
        <Eye size={16} className="text-blue-600" />
      </Button>
    )
  }
]
