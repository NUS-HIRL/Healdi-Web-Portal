"use client"

import { use } from "react"
import EmptyState from "@/components/chat/empty-state"
import Header from "@/components/chat/chat-header"
import Body from "@/components/chat/body"
import Form from "@/components/chat/form"
import SearchMessageBox from "@/components/chat/search-message-box"
import { useEffect, useState, useCallback } from "react"
import { Message, Chat, UserType } from "@/types/chat"
import { conversations } from "@/app/chat/layout"
import { useMessageSearch } from "@/hooks/use-message-search"

interface IParams {
  chatId: string
}

const ChatId = ({ params }: { params: Promise<IParams> }) => {
  const { chatId } = use(params)
  const [messages, setMessages] = useState<Message[]>([])
  const [chat, setChat] = useState<(Chat & { users: UserType[] }) | null>(null)
  const [searchBarOpen, setSearchBarOpen] = useState(false)

  const {
    highlightQuery,
    hitIds,
    hitIndex,
    searchTargetId,
    search,
    goToNext,
    goToPrev,
    resetSearch,
    isSearching
  } = useMessageSearch({
    messages,
    debounceDelay: 300
  })
  const toggleSearch = useCallback(() => {
    setSearchBarOpen((prev) => !prev)
    resetSearch()
  }, [resetSearch])

  useEffect(() => {
    const chat =
      conversations.find((chatItem) => chatItem.id === chatId) || null
    setChat(chat)
    setMessages(
      chat
        ? [...chat.messages].sort(
            (msg1, msg2) =>
              new Date(msg1.createdAt).getTime() -
              new Date(msg2.createdAt).getTime()
          )
        : []
    )
  }, [chatId])

  if (!chat) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }
  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <Header chat={chat} onToggleSearch={toggleSearch} />

        {searchBarOpen && (
          <SearchMessageBox
            onClose={() => setSearchBarOpen(false)}
            onSearch={search}
            onNext={goToNext}
            onPrev={goToPrev}
            hitIds={hitIds}
            hitIndex={hitIndex}
            hasQuery={!!highlightQuery.trim()}
            isSearching={isSearching}
          />
        )}

        <Body
          messages={messages}
          setMessages={setMessages}
          searchTargetId={searchTargetId}
          highlightQuery={highlightQuery}
          searchBarOpen={searchBarOpen}
        />
        <Form />
      </div>
    </div>
  )
}

export default ChatId
