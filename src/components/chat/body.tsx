"use client"

import { Message } from "@/types/chat"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import MessageBox from "@/components/chat/message-box"
import SystemNotice from "@/components/chat/system-notice"

interface BodyProps {
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  setSearchTargetId?: Dispatch<SetStateAction<string>>
  searchTargetId?: string
}

const Body: React.FC<BodyProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "start", behavior: "smooth" })
  }, [messages.length])

  return (
    <div
      ref={scrollRef}
      className="bg-[url(/chat/chat-pattern.svg)] bg-repeat bg-fixed flex-1 overflow-y-auto flex flex-col-reverse min-h-0">
      <div ref={bottomRef} />

      {messages
        .slice()
        .reverse()
        .map((message) => (
          <div key={message.id} className="p-0 m-0">
            <MessageBox data={message} />
          </div>
        ))}

      <SystemNotice text="Welcome to Healdi chat!" />
    </div>
  )
}

export default Body
