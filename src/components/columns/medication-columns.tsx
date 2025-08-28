import { MedicationTableValue } from "@/types/medication"
import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderCell } from "../common/table-header-cell"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Check } from "lucide-react"

interface MedicationColumnsProps {
  onViewMedication: (medication: MedicationTableValue) => void
}

export const MedicationColumns = ({
  onViewMedication
}: MedicationColumnsProps): ColumnDef<MedicationTableValue>[] => [
  {
    accessorKey: "name",
    header: () => <TableHeaderCell label="Medication Name" />,
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="bg-orange-100 text-red-500 border-pink-200 whitespace-nowrap">
        {row.original.name}
      </Badge>
    )
  },
  {
    accessorKey: "dosage",
    header: () => <TableHeaderCell label="Dosage" />,
    cell: ({ row }) => row.original.dosage
  },
  {
    accessorKey: "type",
    header: () => <TableHeaderCell label="Type" />,
    cell: ({ row }) => (
      <span className="block max-w-[20rem] whitespace-normal break-words">
        {row.original.type}
      </span>
    )
  },
  {
    accessorKey: "custom",
    header: () => <TableHeaderCell label="Custom" />,
    cell: ({ row }) => (row.original.custom ? "Yes" : "No")
  },
  {
    id: "selected",
    header: () => <TableHeaderCell label="Selected" noSort inline />,
    cell: ({ row }) => {
      const selected = row.original.selected
      return (
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-pressed={selected}
          aria-label={selected ? "Selected" : "Not selected"}
          className={[
            "w-8 h-8 bg-white",
            selected
              ? "border-lime-400 text-lime-600"
              : "border-gray-300 text-transparent"
          ].join(" ")}
        >
          <Check size={16} />
        </Button>
      )
    }
  }
]
