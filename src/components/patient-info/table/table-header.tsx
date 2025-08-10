import { ChevronUp, ChevronDown } from 'lucide-react'

interface TableHeaderProps {
  title: string
  onSort: () => void
  sortable?: boolean
}

export function TableHeader({ title, onSort, sortable = true }: TableHeaderProps) {
  if (!sortable) {
    return (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </th>
    )
  }

  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <button
        onClick={onSort}
        className="flex items-center space-x-1 font-medium text-gray-900"
      >
        <span>{title}</span>
        <div className="flex flex-col ml-1">
          <ChevronUp size={12} className="text-gray-400" />
          <ChevronDown size={12} className="text-gray-400" />
        </div>
      </button>
    </th>
  )
} 