import { Medication } from "@/types/medication"
import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderCell } from "../common/table-header-cell"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Eye } from "lucide-react"

interface MedicationColumnsProps {
  onViewMedication: (medication: Medication) => void
}

export const MedicationColumns = ({
  onViewMedication
}: MedicationColumnsProps): ColumnDef<Medication>[] => [
  {
    accessorKey: "name",
    header: () => (
      <TableHeaderCell
        label="Medication Name"
        // active={sortKey === "name"}
        // dir={sortDir}
        // onClick={() => toggleSort("name")}
      />
    ),
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
    header: () => (
      <TableHeaderCell
        label="Dosage"
        // active={sortKey === "name"}
        // dir={sortDir}
        // onClick={() => toggleSort("name")}
      />
    ),
    cell: ({ row }) => row.original.dosage
  },
  {
    accessorKey: "type",
    header: () => (
      <TableHeaderCell
        label="Type"
        // active={sortKey === "name"}
        // dir={sortDir}
        // onClick={() => toggleSort("name")}
      />
    ),
    cell: ({ row }) => (
      <span className="block max-w-[20rem] whitespace-normal break-words">
        {row.original.type}
      </span>
    )
  },
  {
    accessorKey: "creator",
    header: () => (
      <TableHeaderCell
        label="Custom"
        // active={sortKey === "name"}
        // dir={sortDir}
        // onClick={() => toggleSort("name")}
      />
    ),
    cell: ({ row }) => (
      <span className="block max-w-[28rem] whitespace-normal break-words leading-relaxed">
        {/* TODO: Parse creator to "Custom" column */}
        {row.original.creator}
      </span>
    )
  },
  {
    id: "actions",
    header: () => <TableHeaderCell label="Action" noSort inline={true} />,
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 border-blue-300 hover:bg-blue-200"
        onClick={() => onViewMedication(row.original)}>
        <Eye size={16} className="text-blue-600" />
      </Button>
    )
  }
]
