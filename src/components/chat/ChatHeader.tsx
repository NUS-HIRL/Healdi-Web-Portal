"use client";

import Avatar from "./Avatar";
import { IoSearchOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import useOtherUser from "@/hooks/use-other-user";
import { Chat } from "@/types/chat";

interface ChatHeaderProps {
  chat: Chat;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat }) => {
  const otherUser = useOtherUser(chat);

  return (
    <>
      <div
        className="
          bg-white
          flex
          border-b-[1px]
          py-3
          px-4
          lg:px-6
          justify-between
          items-center
          gap-3
        "
      >
        <div className="flex flex-shrink-0 gap-3 items-center">
          <Avatar user={otherUser} />

          <div className="flex flex-col">
            <div>{otherUser.name}</div>
            <div
              className="
                text-sm
                font-light
                text-neutral-500
              "
            >
              Patient
            </div>
          </div>
        </div>
        <div
          className={cn(
            `
            flex
            w-full
            gap-3
            justify-end
            items-center
            `
          )}
        >
          <IoSearchOutline
            size={32}
            className="
              text-gray-400
              cursor-pointer
            "
          />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
