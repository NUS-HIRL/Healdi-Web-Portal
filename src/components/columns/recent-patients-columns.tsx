import { Patient } from "@/types/patient"
import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderCell } from "../common/table-header-cell"
import { ActionButton } from "../patient-info/action-button"

export const RecentPatientsColumns = (): ColumnDef<Patient>[] => [
  {
    accessorKey: "patientUid",
    header: () => <TableHeaderCell label="Patient UID" />,
    cell: ({ row }) => row.original.patientUid
  },
  {
    accessorKey: "age",
    header: () => <TableHeaderCell label="Age" />,
    cell: ({ row }) => row.original.age
  },
  {
    accessorKey: "gender",
    header: () => <TableHeaderCell label="Gender" />,
    cell: ({ row }) => row.original.gender
  },
  {
    id: "actions",
    header: () => <TableHeaderCell label="Action" noSort inline={true} />,
    cell: ({ row }) => <ActionButton patientUid={row.original.patientUid} />
  }
]
