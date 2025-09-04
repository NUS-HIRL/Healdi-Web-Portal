import { useDebounce } from "@/hooks/use-debounce"
import { computeHitIds } from "@/lib/chat"
import { useCallback, useEffect, useMemo, useState } from "react"

import { Message } from "@/types/chat"

interface UseMessageSearchProps {
  messages: Message[]
  onSearchResultClick?: (messageId: string) => void
  debounceDelay?: number
}

export const useMessageSearch = ({
  messages,
  onSearchResultClick,
  debounceDelay = 300
}: UseMessageSearchProps) => {
  const [rawQuery, setRawQuery] = useState<string>("")
  const [hitIds, setHitIds] = useState<string[]>([])
  const [hitIndex, setHitIndex] = useState<number>(-1)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const debouncedQuery = useDebounce(rawQuery, debounceDelay)

  const searchTargetId = useMemo(
    () => (hitIds.length > 0 && hitIndex >= 0 ? hitIds[hitIndex] : ""),
    [hitIds, hitIndex]
  )

  const highlightQuery = useMemo(() => debouncedQuery.trim(), [debouncedQuery])

  const performSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim()

      if (!trimmedQuery) {
        setHitIds([])
        setHitIndex(-1)
        setIsSearching(false)
        if (onSearchResultClick) {
          onSearchResultClick("")
        }
        return
      }

      setIsSearching(true)

      requestAnimationFrame(() => {
        const ids = computeHitIds(messages, trimmedQuery)

        setHitIds(ids)

        if (ids.length > 0) {
          setHitIndex(0)
          if (onSearchResultClick) {
            onSearchResultClick(ids[0])
          }
        } else {
          setHitIndex(-1)
          if (onSearchResultClick) {
            onSearchResultClick("")
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
    if (hitIds.length === 0) return

    const newIndex = (hitIndex + 1) % hitIds.length
    setHitIndex(newIndex)
    if (onSearchResultClick) {
      onSearchResultClick(hitIds[newIndex])
    }
  }, [hitIds, hitIndex, onSearchResultClick])

  const goToPrev = useCallback(() => {
    if (hitIds.length === 0) return

    const newIndex = (hitIndex - 1 + hitIds.length) % hitIds.length
    setHitIndex(newIndex)
    if (onSearchResultClick) {
      onSearchResultClick(hitIds[newIndex])
    }
  }, [hitIds, hitIndex, onSearchResultClick])

  const resetSearch = useCallback(() => {
    setRawQuery("")
    setHitIds([])
    setHitIndex(-1)
    setIsSearching(false)
    if (onSearchResultClick) {
      onSearchResultClick("")
    }
  }, [onSearchResultClick])

  return {
    highlightQuery,
    hitIds,
    hitIndex,
    searchTargetId,
    performSearch,
    search,
    goToNext,
    goToPrev,
    resetSearch,
    isSearching,
    hasResults: hitIds.length > 0,
    totalResults: hitIds.length,
    currentResult: hitIndex + 1
  }
}
