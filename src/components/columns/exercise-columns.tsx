import { Exercise } from "@/types/exercise"
import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderCell } from "../common/table-header-cell"
import { Button } from "../ui/button"
import { Eye } from "lucide-react"

interface ExerciseColumnsProps {
  onViewExercise: (exercise: Exercise) => void
}

export const ExerciseColumns = ({
  onViewExercise
}: ExerciseColumnsProps): ColumnDef<Exercise>[] => [
  {
    accessorKey: "activityType",
    header: () => <TableHeaderCell label="Activity Type" />,
    cell: ({ row }) => row.original.activityType
  },
  {
    accessorKey: "duration",
    header: () => <TableHeaderCell label="Duration" />,
    cell: ({ row }) => row.original.duration
  },
  {
    accessorKey: "frequency",
    header: () => <TableHeaderCell label="Frequency" />,
    cell: ({ row }) => row.original.frequency
  },
  {
    accessorKey: "intensity",
    header: () => <TableHeaderCell label="Intensity" />,
    cell: ({ row }) => row.original.intensity
  },
  {
    accessorKey: "assignedOrSaved",
    header: () => <TableHeaderCell label="Assigned/Saved" />,
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
        onClick={() => onViewExercise(row.original)}>
        <Eye size={16} className="text-blue-600" />
      </Button>
    )
  }
]
