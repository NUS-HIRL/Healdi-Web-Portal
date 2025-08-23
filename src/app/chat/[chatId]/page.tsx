"use client";

import { use } from "react";
import EmptyState from "@/components/chat/empty-state";
import Header from "@/components/chat/chat-header";
import Body from "@/components/chat/body";
import Form from "@/components/chat/form";
import { useEffect, useState } from "react";
import { Message, Chat, UserType } from "@/types/chat";
import { conversations } from "@/app/chat/layout";

interface IParams {
  chatId: string;
}

const ChatId = ({ params }: { params: Promise<IParams> }) => {
  const { chatId } = use(params);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<(Chat & { users: UserType[] }) | null>(null);
  const [searchTargetId, setSearchTargetId] = useState<string>("");

  useEffect(() => {
    const c = conversations.find((chat) => chat.id === chatId) || null;
    setChat(c);

    if (c) {
      // Sort messages by createdAt ascending
      const sorted = [...c.messages].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessages(sorted);
    } else {
      setMessages([]);
    }
  }, [chatId]);

  if (!chat) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <Header chat={chat} />
        <Body
          messages={messages}
          setMessages={setMessages}
          setSearchTargetId={setSearchTargetId}
          searchTargetId={searchTargetId}
        />
        <Form />
      </div>
    </div>
  );
};

export default ChatId;
