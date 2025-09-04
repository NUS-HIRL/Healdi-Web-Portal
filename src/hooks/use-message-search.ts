import { useDebounce } from "@/hooks/use-debounce"
import { computeOccurrences, SearchOccurrence } from "@/lib/chat"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Message } from "@/types/chat"

interface UseMessageSearchProps {
  messages: Message[]
  onSearchResultClick?: (occurrence: SearchOccurrence | null) => void
  debounceDelay?: number
}

export const useMessageSearch = ({
  messages,
  onSearchResultClick,
  debounceDelay = 300
}: UseMessageSearchProps) => {
  const [rawQuery, setRawQuery] = useState<string>("")
  const [occurrences, setOccurrences] = useState<SearchOccurrence[]>([])
  const [occurrenceIndex, setOccurrenceIndex] = useState<number>(-1)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const debouncedQuery = useDebounce(rawQuery, debounceDelay)

  const currentOccurrence = useMemo(
    () => (occurrences.length > 0 && occurrenceIndex >= 0 ? occurrences[occurrenceIndex] : null),
    [occurrences, occurrenceIndex]
  )

  const highlightQuery = useMemo(() => debouncedQuery.trim(), [debouncedQuery])

  const performSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim()

      if (!trimmedQuery) {
        setOccurrences([])
        setOccurrenceIndex(-1)
        setIsSearching(false)
        if (onSearchResultClick) {
          onSearchResultClick(null)
        }
        return
      }

      setIsSearching(true)

      requestAnimationFrame(() => {
        const foundOccurrences = computeOccurrences(messages, trimmedQuery)

        setOccurrences(foundOccurrences)

        if (foundOccurrences.length > 0) {
          setOccurrenceIndex(0)
          if (onSearchResultClick) {
            onSearchResultClick(foundOccurrences[0])
          }
        } else {
          setOccurrenceIndex(-1)
          if (onSearchResultClick) {
            onSearchResultClick(null)
          }
        }

        setIsSearching(false)
      })
    },
    [messages, onSearchResultClick]
  )

  useEffect(() => {
    performSearch(debouncedQuery)
  }, [debouncedQuery, performSearch])

  const search = useCallback((query: string) => {
    setRawQuery(query)
  }, [])

  const goToNext = useCallback(() => {
    if (occurrences.length === 0) return

    const newIndex = (occurrenceIndex + 1) % occurrences.length
    setOccurrenceIndex(newIndex)
    if (onSearchResultClick) {
      onSearchResultClick(occurrences[newIndex])
    }
  }, [occurrences, occurrenceIndex, onSearchResultClick])

  const goToPrev = useCallback(() => {
    if (occurrences.length === 0) return

    const newIndex = (occurrenceIndex - 1 + occurrences.length) % occurrences.length
    setOccurrenceIndex(newIndex)
    if (onSearchResultClick) {
      onSearchResultClick(occurrences[newIndex])
    }
  }, [occurrences, occurrenceIndex, onSearchResultClick])

  const resetSearch = useCallback(() => {
    setRawQuery("")
    setOccurrences([])
    setOccurrenceIndex(-1)
    setIsSearching(false)
    if (onSearchResultClick) {
      onSearchResultClick(null)
    }
  }, [onSearchResultClick])

  return {
    highlightQuery,
    occurrences,
    occurrenceIndex,
    currentOccurrence,
    search,
    goToNext,
    goToPrev,
    resetSearch,
    isSearching,
    hasResults: occurrences.length > 0,
    totalResults: occurrences.length,
    currentResult: occurrenceIndex + 1
  }
}