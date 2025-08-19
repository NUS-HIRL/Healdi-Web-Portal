"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Chat } from "@/types/chat";
import Avatar from "@/components/chat/Avatar";
import useOtherUser from "@/hooks/use-other-user";

interface ChatBoxProps {
  data: Chat;
  selected?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ data, selected }) => {
  const isActive = true;
  const currentUser = {
    id: "u0",
    name: "John Doe",
    email: "johndoe@example.com",
    image: "",
    createdAt: new Date("2025-01-10T15:00:00Z"),
    updatedAt: new Date("2025-02-10T15:00:00Z"),
  };

  const otherUser = useOtherUser(data);
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/chat/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userId = currentUser.id;

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    if (!userId) return false;

    const seenArray = lastMessage.seen || [];
    return seenArray.some((user) => user.userId === userId);
  }, [userId, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an Image";
    if (lastMessage?.body) return lastMessage.body;
    return "Started a chat";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        `
        w-full
        max-w-full 
        flex
        items-center
        space-x-3
        p-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
      `,
        selected ? "bg-amber-50" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p
              className={cn(
                `
                truncate
                text-sm
                flex-1 min-w-0
                `,
                hasSeen ? "text-gray-500" : "text-black font-medium"
              )}
            >
              {lastMessageText}
            </p>
            {isActive ? (
              <span
                className="
                  block
                  shrink-0 
                  rounded-full
                  bg-green-500
                  ring-2
                  ring-white
                  h-2
                  w-2
                "
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
