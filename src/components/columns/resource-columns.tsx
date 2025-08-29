"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Resource } from "@/types/resource"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { TableHeaderCell } from "@/components/common/table-header-cell"

interface ResourceColumnsProps {
  onViewResource: (resource: Resource) => void
}

export const ResourceColumns = ({
  onViewResource
}: ResourceColumnsProps): ColumnDef<Resource>[] => [
  {
    accessorKey: "type",
    header: () => <TableHeaderCell label="Type" />,
    cell: ({ row }) => row.original.type
  },
  {
    accessorKey: "source",
    header: () => <TableHeaderCell label="Source" />,
    cell: ({ row }) => row.original.source
  },
  {
    accessorKey: "title",
    header: () => <TableHeaderCell label="Title" />,
    cell: ({ row }) => (
      <span className="block max-w-[20rem] whitespace-normal break-words">
        {row.original.title}
      </span>
    )
  },
  {
    accessorKey: "assignedOrSaved",
    header: () => <TableHeaderCell label="Assigned / Saved" />,
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
