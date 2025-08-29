import { Patient } from "@/types/patient"
import { ColumnDef } from "@tanstack/react-table"
import { TableHeaderCell } from "../common/table-header-cell"
import { ActionButton } from "../patient-info/action-button"
import { FitnessLevelBadge } from "../patient-info/fitness-level-badge"

export const PatientInfoColumns = (): ColumnDef<Patient>[] => [
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
    accessorKey: "fitnessLevel",
    header: () => <TableHeaderCell label="Fitness Level" />,
    cell: ({ row }) => <FitnessLevelBadge level={row.original.fitnessLevel} />
  },
  {
    accessorKey: "hrv",
    header: () => <TableHeaderCell label="HRV (ms)" />,
    cell: ({ row }) => `${row.original.hrv} ms`
  },
  {
    accessorKey: "healthConditions",
    header: () => <TableHeaderCell label="Health Conditions" noSort />,
    cell: ({ row }) => (
      <span className="block max-w-[20rem] whitespace-normal break-words">
        {row.original.healthConditions.join(", ")}
      </span>
    )
  },
  {
    accessorKey: "goals",
    header: () => <TableHeaderCell label="Goals" noSort />,
    cell: ({ row }) => (
      <span className="block max-w-[20rem] whitespace-normal break-words">
        {row.original.goals.join(", ")}
      </span>
    )
  },
  {
    id: "actions",
    header: () => <TableHeaderCell label="Action" noSort inline={true} />,
    cell: ({ row }) => <ActionButton patientUid={row.original.patientUid} />
  }
]
