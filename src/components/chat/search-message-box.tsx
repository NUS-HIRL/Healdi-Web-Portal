"use client"

import { IoChevronUp, IoChevronDown, IoSearch } from "react-icons/io5"
import { useForm } from "react-hook-form"

interface SearchMessageBoxProps {
  onClose: () => void
  onSearch: (query: string) => void
  onNext: () => void
  onPrev: () => void
  hitIds: string[]
  hitIndex: number
  hasQuery: boolean
  isSearching?: boolean
}

type FormData = { searchQuery: string }

const SearchMessageBox: React.FC<SearchMessageBoxProps> = ({
  onClose,
  onSearch,
  onNext,
  onPrev,
  hitIds,
  hitIndex,
  hasQuery,
  isSearching = false
}) => {
  const { register, setValue } = useForm<FormData>({
    defaultValues: { searchQuery: "" }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setValue("searchQuery", query)
    onSearch(query)
  }

  return (
    <div className="bg-white border-b px-5 py-5">
      <div className="flex items-center gap-2 lg:gap-4 w-full max-h-8">
        <div className="flex items-center w-full h-full relative">
          <IoSearch
            className="absolute h-4 w-4 left-3 text-gray-400 text-xl z-10"
            aria-hidden="true"
          />

          <label htmlFor="searchQuery" className="sr-only">
            Search messages
          </label>
          <input
            type="text"
            id="searchQuery"
            autoComplete="off"
            {...register("searchQuery")}
            onChange={handleInputChange}
            placeholder="Search messages"
            className="pl-10 pr-8 py-2 h-8 w-full rounded-sm text-sm text-gray-800 border border-blue-300 outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 [box-shadow:none] focus:[box-shadow:none]"
            maxLength={4096}
            aria-label="Search messages"
          />
        </div>

        <div className="flex items-center gap-2">
          {hasQuery && hitIds.length > 0 && (
            <span className="text-black text-sm min-w-12 text-center">
              {hitIndex + 1} of {hitIds.length}
            </span>
          )}

          <button
            type="button"
            onClick={onPrev}
            disabled={!hitIds.length || isSearching}
            className="w-8 h-8 flex items-center justify-center rounded-sm bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous search result">
            <IoChevronUp size={24} className="text-gray-500" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!hitIds.length || isSearching}
            className="w-8 h-8 flex items-center justify-center rounded-sm bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next search result">
            <IoChevronDown size={24} className="text-gray-500" />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-sky-500 font-medium px-2 py-1 transition-colors whitespace-nowrap cursor-pointer">
          Done
        </button>
      </div>
    </div>
  )
}

export default SearchMessageBox
