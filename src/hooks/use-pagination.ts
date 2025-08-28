import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const usePagination = () => {
  const [paginationToken, setPaginationToken] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()

  const sortBy = searchParams.get("sortBy")
  const sortOrder = searchParams.get("sortOrder")
  const filterBy = searchParams.get("filterBy")
  const filterValue = searchParams.get("filterValue")
  const searchBy = searchParams.get("searchBy")
  const searchTerm = searchParams.get("searchTerm")
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

  const handleFilter = (filterBy: string, filterValue: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set("filterBy", filterBy)
    newParams.set("filterValue", filterValue)
    router.push(`?${newParams.toString()}`)
  }

  const handleSearch = (searchBy: string, searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("searchBy", searchBy)
    params.set("searchTerm", searchTerm)
    router.replace(`?${params.toString()}`)
  }

  const clearSearchParams = (byKey: string, valueKey: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete(byKey)
    newParams.delete(valueKey)
    router.push(`?${newParams.toString()}`)
  }

  return {
    paginationToken,
    setPaginationToken,
    sortBy,
    sortOrder,
    filterBy,
    filterValue,
    searchBy,
    searchTerm,
    startDate,
    endDate,
    handleSort,
    handleFilter,
    handleSearch,
    clearSearchParams
  }
}

export default usePagination
