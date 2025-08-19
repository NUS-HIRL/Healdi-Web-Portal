"use client";

import { Chat, UserType } from "@/types/chat";
import clsx from "clsx";
import { useState } from "react";
import ChatBox from "@/components/chat/ChatBox";
import { Switch } from "@/components/ui/switch";
import useChat from "@/hooks/use-chat";
import Image from "next/image";

interface ChatListProps {
  initialItems: Chat[];
  users: UserType[];
}

const ChatList: React.FC<ChatListProps> = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);

  const { chatId } = useChat();

  return (
    <>
      <aside
        className={clsx(
          `
          h-full
          pb-20
          lg:pb-0
          lg:left-20
          lg:w-80
          lg:block
          overflow-y-auto
          overflow-x-hidden
          border-r
          border-gray-200`
        )}
      >
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 bg-white">
            <div className="flex justify-between items-center mb-4 pt-4 px-2">
              <div
                className="
                text-2xl
                font-bold
                text-neutral-800
              "
              >
                Chat
              </div>

              <Switch
                id="airplane-mode"
                className="
                w-14 h-9
                data-[state=checked]:bg-green-500 
                data-[state=unchecked]:bg-gray-300
                [&>span]:h-7 [&>span]:w-7
              "
              />
            </div>
            <hr />
          </div>

          <div className="flex-1 w-full">
            {items.length > 0 ? (
              items.map((item) => (
                <ChatBox
                  key={item.id}
                  data={item}
                  selected={chatId === item.id}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Image
                  alt="No active chat"
                  src={"/chat/no-active-chat.svg"}
                  height={150}
                  width={150}
                />
                <div>No active chat around here</div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatList;
