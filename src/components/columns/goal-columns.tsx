"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Goal } from "@/types/goal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { TableHeaderCell, SortDir } from "@/components/common/table-header-cell"

interface GoalColumnsProps {
  onSortingChange: (columnKey: string) => void
  onViewGoal: (goal: Goal) => void
  sorting: {
    column: string | null
    direction: SortDir | null
  }
}

export const goalColumns = ({
  onSortingChange,
  onViewGoal,
  sorting
}: GoalColumnsProps): ColumnDef<Goal>[] => [
  {
    accessorKey: "category",
    header: () => (
      <TableHeaderCell
        label="Category"
        active={sorting.column === "category"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("category")}
        inline={true}
      />
    ),
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="bg-orange-100 text-red-500 border-pink-200 whitespace-nowrap">
        {row.original.category}
      </Badge>
    )
  },
  {
    accessorKey: "completionType",
    header: () => (
      <TableHeaderCell
        label="Completion Type"
        active={sorting.column === "completionType"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("completionType")}
        inline={true}
      />
    ),
    cell: ({ row }) => row.original.completionType
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
    accessorKey: "description",
    header: () => (
      <TableHeaderCell
        label="Description"
        active={sorting.column === "description"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("description")}
        inline={true}
      />
    ),
    cell: ({ row }) => (
      <span className="block max-w-[28rem] whitespace-normal break-words leading-relaxed">
        {row.original.description}
      </span>
    )
  },
  {
    accessorKey: "coins",
    header: () => (
      <TableHeaderCell
        label="Coins"
        active={sorting.column === "coins"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("coins")}
        inline={true}
      />
    ),
    cell: ({ row }) => row.original.coins
  },
  {
    accessorKey: "bonus",
    header: () => (
      <TableHeaderCell
        label="Bonus"
        active={sorting.column === "bonus"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("bonus")}
        inline={true}
      />
    ),
    cell: ({ row }) => row.original.bonus
  },
  {
    accessorKey: "progress",
    header: () => (
      <TableHeaderCell
        label="Progress"
        active={sorting.column === "progress"}
        dir={sorting.direction || undefined}
        onClick={() => onSortingChange("progress")}
        inline={true}
      />
    ),
    cell: ({ row }) => row.original.progress
  },
  {
    id: "actions",
    header: () => <TableHeaderCell label="Action" noSort inline={true} />,
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 border-blue-300 hover:bg-blue-200"
        onClick={() => onViewGoal(row.original)}>
        <Eye size={16} className="text-blue-600" />
      </Button>
    )
  }
]
