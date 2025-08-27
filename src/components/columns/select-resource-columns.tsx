import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink } from "lucide-react"
import { TableHeaderCell } from "@/components/common/table-header-cell"
import { Resource } from "@/types/resource"

interface SelectResourceColumnsProps {
  selectedResources: Set<string>
  onSelectResource: (resourceId: string, checked: boolean) => void
  onSelectAll: (checked: boolean) => void
}

export const SelectResourceColumns = ({
  selectedResources,
  onSelectResource,
  onSelectAll
}: SelectResourceColumnsProps): ColumnDef<Resource>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value)
          onSelectAll(!!value)
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedResources.has(row.original.id)}
        onCheckedChange={(value) =>
          onSelectResource(row.original.id, !!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "type",
    header: () => <TableHeaderCell label="Type" />,
    cell: ({ row }) => row.original.type
  },
  {
    accessorKey: "category",
    header: () => <TableHeaderCell label="Category" />,
    cell: ({ row }) => row.original.category
  },
  {
    accessorKey: "source",
    header: () => <TableHeaderCell label="Source" />,
    cell: ({ row }) => row.original.source
  },
  {
    accessorKey: "title",
    header: () => <TableHeaderCell label="Title" />,
    cell: ({ row }) => row.original.title
  },
  {
    id: "actions",
    header: () => <TableHeaderCell label="Action" noSort inline={true} />,
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 border-blue-300 hover:bg-blue-200"
        onClick={() => {
          // Open resource link in new tab
          window.open(row.original.url || '#', '_blank')
        }}>
        <ExternalLink size={16} className="text-blue-600" />
      </Button>
    )
  }
]
