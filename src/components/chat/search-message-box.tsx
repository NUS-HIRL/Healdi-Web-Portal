"use client"

import { Message } from "@/types/chat"
import { IoChevronUp, IoChevronDown, IoSearch } from "react-icons/io5"
import { Dispatch, SetStateAction } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { computeHitIds } from "@/lib/chat"

interface SearchProps {
  searchBarOpen: boolean
  onClose: () => void
  messages: Message[]
  setSearchTargetId: Dispatch<SetStateAction<string>>
  setHighlightQuery: Dispatch<SetStateAction<string>>
  hitIds: string[]
  hitIndex: number
  setHitIndex: Dispatch<SetStateAction<number>>
}

type FormData = { searchQuery: string }

const Search: React.FC<SearchProps> = ({
  onClose,
  messages,
  setSearchTargetId,
  setHighlightQuery,
  hitIds,
  hitIndex,
  setHitIndex
}) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { searchQuery: "" }
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const q = data.searchQuery?.trim() ?? ""
    setHighlightQuery(q)

    const ids = computeHitIds(messages, q)
    if (!ids.length) {
      setHitIndex(-1)
      return
    }
    setHitIndex(0)
    setSearchTargetId(ids[0])
  }

  const goTo = (index: number) => {
    if (!hitIds.length) return
    const normalized = ((index % hitIds.length) + hitIds.length) % hitIds.length // wrap
    setHitIndex(normalized)
    setSearchTargetId(hitIds[normalized])
  }

  const next = () => goTo(hitIndex + 1)
  const prev = () => goTo(hitIndex - 1)

  return (
    <div className="bg-white border-b px-5 py-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full max-h-8">
        <div className="flex items-center w-full h-full relative">
          <IoSearch className="absolute h-4 w-4 left-3 text-gray-400 text-xl z-10" />
          <input
            type="text"
            id="searchQuery"
            autoComplete="off"
            {...register("searchQuery")}
            placeholder="Search messages"
            className="pl-10 pr-4 py-2 h-8 w-full rounded-sm text-sm text-gray-800 border border-blue-300 outline-none focus:outline-none ring-0 focus:ring-0 focus:ring-offset-0 [box-shadow:none] focus:[box-shadow:none]"
            maxLength={4096}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-black text-sm w-12 text-center">
            {hitIds.length ? `${hitIndex + 1} of ${hitIds.length}` : "0 of 0"}
          </span>
          <button
            type="button"
            onClick={prev}
            disabled={!hitIds.length}
            className="w-8 h-8 flex items-center justify-center rounded-sm bg-gray-100 disabled:opacity-40 cursor-pointer">
            <IoChevronUp size={24} color="gray" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!hitIds.length}
            className="w-8 h-8 flex items-center justify-center rounded-sm bg-gray-100 disabled:opacity-40 cursor-pointer">
            <IoChevronDown size={24} color="gray" />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-sky-500 font-medium px-2 py-1 transition-colors whitespace-nowrap cursor-pointer">
          Done
        </button>
      </form>
    </div>
  )
}

export default Search
