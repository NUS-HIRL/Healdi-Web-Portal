interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageIndex: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
  return (
    <div className="px-6 py-3 border-t border-gray-200">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i).map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => onPageChange(pageIndex)}
              className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                currentPage === pageIndex
                  ? "border-blue-500 text-blue-600 bg-white"
                  : "border-transparent text-gray-700 hover:text-gray-900"
              }`}>
              {pageIndex + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}
