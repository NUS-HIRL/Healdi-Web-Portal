"use client"

import { Message } from "@/types/chat"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import Image from "next/image"
import { SearchOccurrence } from "@/lib/chat"
import { HighlightedText } from "@/components/chat/highlighted-text"

interface MessageBoxProps {
  data: Message
  highlightQuery?: string
  searchBarOpen: boolean
  currentOccurrence?: SearchOccurrence | null
}

const MessageBox: React.FC<MessageBoxProps> = ({
  data,
  highlightQuery,
  searchBarOpen,
  currentOccurrence = null
}) => {
  const currentUserEmail = "johndoe@example.com"
  const isOwn =
    (currentUserEmail &&
      data?.sender?.email &&
      currentUserEmail === data.sender.email) ||
    false

  const activeQuery = searchBarOpen ? highlightQuery : ""
  const isCurrentMessageTarget = currentOccurrence?.messageId === data.id

  const container = cn("flex gap-3 p-4", isOwn && "justify-end")
  const body = cn(
    "flex flex-col gap-2 rounded-lg p-2",
    isOwn ? "items-end bg-sky-500 text-white" : "bg-sky-100"
  )
  const message = cn(
    `text-sm max-w-2xl break-words whitespace-break-spaces`,
    data.image && "rounded p-0"
  )
  const date = cn(`text-sm`, isOwn ? "text-white" : "text-gray-400")

  return (
    <div className={container}>
      <div className={body}>
        <div className="flex items-center gap-1">
          {!isOwn && (
            <div className="text-sm text-sky-500 font-bold">
              {data?.sender?.name ?? "Unknown"}
            </div>
          )}
        </div>

        <div className={message}>
          {data?.image ? (
            <Image
              alt="Message image"
              height={288}
              width={288}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition"
            />
          ) : data.body ? (
            <HighlightedText
              text={data.body}
              query={activeQuery || ""}
              isOwn={isOwn}
              currentOccurrence={isCurrentMessageTarget ? currentOccurrence : null}
            />
          ) : null}
        </div>

        {data?.createdAt && (
          <div className={date}>{format(new Date(data.createdAt), "p")}</div>
        )}
      </div>
    </div>
  )
}

export default MessageBox