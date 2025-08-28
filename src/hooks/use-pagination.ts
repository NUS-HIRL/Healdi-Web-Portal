import { PaginationState } from "@tanstack/react-table"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { PaginationKeys } from "@/types/response"

const usePagination = (
  pagination: PaginationState,
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
) => {
  // Current Last Evaluated Key for DynamoDB, to display current page results
  // null for first page
  const [currentPaginationToken, setCurrentPaginationToken] = useState<
    string | null
  >(null)

  // Store next_page_key/prev_page_key for forward + backward pagination
  const [paginationToken, setPaginationToken] = useState<PaginationKeys>({
    next_page_key: null,
    previous_page_key: null
  })

  const searchParams = useSearchParams()
  const router = useRouter()

  const sortBy = searchParams.get("sortBy")
  const sortOrder = searchParams.get("sortOrder")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")

  const handleSort = (column: string) => {
    const newSortOrder =
      searchParams.get("sortOrder") === "asc" ? "desc" : "asc"
    const newParams = new URLSearchParams(searchParams)
    newParams.set("sortBy", column)
    newParams.set("sortOrder", newSortOrder)

    router.push(`?${newParams.toString()}`)
  }

  const clearSearchParams = (byKey: string, valueKey: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete(byKey)
    newParams.delete(valueKey)
    router.push(`?${newParams.toString()}`)
  }

  const setCurrentPaginationTokenAndPageIndex = (
    isNextPage: boolean,
    newCurrentPaginationToken: string
  ) => {
    setCurrentPaginationToken(newCurrentPaginationToken)
    if (isNextPage) {
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))
    } else {
      // Prev page
      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))
    }
  }

  return {
    currentPaginationToken,
    setCurrentPaginationToken,
    paginationToken,
    setPaginationToken,
    pagination,
    setPagination,
    setCurrentPaginationTokenAndPageIndex,
    sortBy,
    sortOrder,
    startDate,
    endDate,
    handleSort,
    clearSearchParams
  }
}

export default usePagination
