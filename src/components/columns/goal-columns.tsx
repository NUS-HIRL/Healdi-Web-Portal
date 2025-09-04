"use client"

import { TableHeaderCell } from "@/components/common/table-header-cell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  mapCategoryToDisplay,
  mapCompletionTypeToDisplay
} from "@/lib/goal-mappings"
import { Goal } from "@/types/goal"
import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"

interface GoalColumnsProps {
  onViewGoal: (goal: Goal) => void
}

export const GoalColumns = ({
  onViewGoal
}: GoalColumnsProps): ColumnDef<Goal>[] => [
  {
    accessorKey: "category",
    header: () => <TableHeaderCell label="Category" inline={true} />,
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="bg-orange-100 text-red-500 border-pink-200 whitespace-nowrap">
        {mapCategoryToDisplay(row.original.category)}
      </Badge>
    )
  },
  {
    accessorKey: "completion_type",
    header: () => <TableHeaderCell label="Completion Type" inline={true} />,
    cell: ({ row }) => mapCompletionTypeToDisplay(row.original.completion_type)
  },
  {
    accessorKey: "title",
    header: () => <TableHeaderCell label="Title" inline={true} />,
    cell: ({ row }) => (
      <span className="block max-w-[20rem] whitespace-normal break-words">
        {row.original.title}
      </span>
    )
  },
  {
    accessorKey: "description",
    header: () => <TableHeaderCell label="Description" inline={true} />,
    cell: ({ row }) => (
      <span className="block max-w-[28rem] whitespace-normal break-words leading-relaxed">
        {row.original.description}
      </span>
    )
  },
  {
    accessorKey: "coin_reward",
    header: () => <TableHeaderCell label="Coins" inline={true} />,
    cell: ({ row }) => row.original.coin_reward
  },
  {
    accessorKey: "completion_bonus_reward",
    header: () => <TableHeaderCell label="Bonus" inline={true} />,
    cell: ({ row }) => row.original.completion_bonus_reward
  },
  {
    accessorKey: "progress",
    header: () => <TableHeaderCell label="Progress" inline={true} />,
    cell: ({ row }) =>
      `${row.original.current_completion_count} / ${row.original.target_completion_count}`
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
