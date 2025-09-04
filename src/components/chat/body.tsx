"use client"

import { Message } from "@/types/chat"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import MessageBox from "@/components/chat/message-box"
import SystemNotice from "@/components/chat/system-notice"
import { SearchOccurrence } from "@/lib/chat"

interface BodyProps {
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  currentOccurrence: SearchOccurrence | null
  highlightQuery: string
  searchBarOpen: boolean
}

const Body: React.FC<BodyProps> = ({
  messages,
  currentOccurrence,
  highlightQuery,
  searchBarOpen
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const messageRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "start", behavior: "smooth" })
  }, [messages.length])

  useEffect(() => {
    if (!currentOccurrence) return
    const target = messageRefs.current[currentOccurrence.messageId]
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [currentOccurrence])

  const getSetMessageRef = (id: string) => (el: HTMLDivElement | null) => {
    messageRefs.current[id] = el
  }

  return (
    <div
      ref={scrollRef}
      className="bg-[url(/chat/chat-pattern.svg)] bg-repeat bg-fixed flex-1 overflow-y-auto flex flex-col-reverse min-h-0">
      <div ref={bottomRef} />

      {messages
        .slice()
        .reverse()
        .map((message) => (
          <div
            ref={getSetMessageRef(message.id)}
            key={message.id}
            className="p-0 m-0">
            <MessageBox
              data={message}
              highlightQuery={highlightQuery}
              searchBarOpen={searchBarOpen}
              currentOccurrence={currentOccurrence?.messageId === message.id ? currentOccurrence : null}
            />
          </div>
        ))}

      <SystemNotice text="Welcome to Healdi chat!" />
    </div>
  )
}

export default Body