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
import { computeHitIds } from "@/lib/chat"

interface IParams {
  chatId: string
}

const ChatId = ({ params }: { params: Promise<IParams> }) => {
  const { chatId } = use(params)
  const [messages, setMessages] = useState<Message[]>([])
  const [chat, setChat] = useState<(Chat & { users: UserType[] }) | null>(null)
  const [searchTargetId, setSearchTargetId] = useState<string>("")
  const [highlightQuery, setHighlightQuery] = useState<string>("")
  const [searchBarOpen, setSearchBarOpen] = useState(false)
  const [hitIds, setHitIds] = useState<string[]>([])
  const [hitIndex, setHitIndex] = useState<number>(-1)

  const toggleSearch = useCallback(() => {
    setSearchBarOpen((prev) => !prev)
    setHitIds([])
    setHitIndex(-1)
    setHighlightQuery("")
    setSearchTargetId("")
  }, [])

  useEffect(() => {
    const chat = conversations.find((chatItem) => chatItem.id === chatId) || null
    setChat(chat)
    setMessages(
      chat
        ? [...chat.messages].sort(
            (msg1, msg2) =>
              new Date(msg1.createdAt).getTime() - new Date(msg2.createdAt).getTime()
          )
        : []
    )
  }, [chatId])

  useEffect(() => {
    if (!highlightQuery.trim()) {
      setHitIds([])
      setHitIndex(-1)
      return
    }
    const ids = computeHitIds(messages, highlightQuery)
    setHitIds(ids)
    if (ids.length) {
      setHitIndex(0)
      setSearchTargetId(ids[0])
    } else {
      setHitIndex(-1)
    }
  }, [messages, highlightQuery])

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
            searchBarOpen={searchBarOpen}
            onClose={() => setSearchBarOpen(false)}
            messages={messages}
            setSearchTargetId={setSearchTargetId}
            setHighlightQuery={setHighlightQuery}
            hitIds={hitIds}
            hitIndex={hitIndex}
            setHitIndex={setHitIndex}
          />
        )}

        <Body
          messages={messages}
          setMessages={setMessages}
          setSearchTargetId={setSearchTargetId}
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
