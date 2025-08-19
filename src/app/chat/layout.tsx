import { Sidebar } from "@/components/common/sidebar";
import ChatList from "@/components/chat/ChatList";
import { Chat, UserType } from "@/types/chat";
import { Footer } from "@/components/common/footer";

import { Header } from "@/components/common/header";

export const users: UserType[] = [
  {
    id: "u0",
    name: "John Doe",
    email: "johndoe@example.com",
    image: "",
    createdAt: new Date("2025-01-10T15:00:00Z"),
    updatedAt: new Date("2025-02-10T15:00:00Z"),
  },
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@example.com",
    image: "",
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-02-01T10:00:00Z"),
  },
  {
    id: "u2",
    name: "Bob Smith",
    email: "bob@example.com",
    image: "",
    createdAt: new Date("2025-01-05T12:00:00Z"),
    updatedAt: new Date("2025-02-05T12:00:00Z"),
  },
  {
    id: "u3",
    name: "Charlie Adams",
    email: "charlie@example.com",
    image: "",
    createdAt: new Date("2025-01-10T15:00:00Z"),
    updatedAt: new Date("2025-02-10T15:00:00Z"),
  },
];

export const conversations: Chat[] = [
  {
    id: "c1",
    createdAt: new Date("2025-02-15T10:00:00Z"),
    lastMessageAt: new Date("2025-02-18T09:45:00Z"),
    users: [users[0], users[1]],
    messages: [
      {
        id: "m1",
        body: `Welcome to Healdi Chat! 
We're here to help you with any queries you may have. Our intelligent Chatbot is ready to assist you.
In case of an emergency and you need immediate assistance from our healthcare team, simply enter /emergencyon in the input field to activate the emergency message function.
Once your emergency situation is resolved, you can enter /emergencyoff in the input field to deactivate the emergency message function. Alternatively, the emergency message function will automatically deactivate if no messages are received within 1 hour of activating it.`,
        createdAt: new Date("2025-02-18T09:30:00Z"),
        chatId: "c1",
        senderId: "u0",
        sender: users[0],
        seen: [{ userId: "u2", seenAt: new Date("2025-02-18T09:35:00Z") }],
      },
      {
        id: "m2",
        body: "Hello, I am feeling great.",
        createdAt: new Date("2025-02-18T09:45:00Z"),
        chatId: "c1",
        senderId: "u1",
        sender: users[1],
        seen: [{ userId: "u1", seenAt: new Date("2025-02-18T09:46:00Z") }],
      },
    ],
  },
  {
    id: "c2",
    createdAt: new Date("2025-02-10T08:00:00Z"),
    lastMessageAt: new Date("2025-02-17T20:00:00Z"),
    users: [users[0], users[2]],
    messages: [
      {
        id: "m3",
        body: `Welcome to Healdi Chat! 
We're here to help you with any queries you may have. Our intelligent Chatbot is ready to assist you.
In case of an emergency and you need immediate assistance from our healthcare team, simply enter /emergencyon in the input field to activate the emergency message function.
Once your emergency situation is resolved, you can enter /emergencyoff in the input field to deactivate the emergency message function. Alternatively, the emergency message function will automatically deactivate if no messages are received within 1 hour of activating it.`,
        createdAt: new Date("2025-02-17T18:00:00Z"),
        chatId: "c2",
        senderId: "u0",
        sender: users[0],
        seen: [{ userId: "u2", seenAt: new Date("2025-02-17T18:10:00Z") }],
      },
      {
        id: "m4",
        body: "I'm in an emergency",
        createdAt: new Date("2025-02-17T20:00:00Z"),
        chatId: "c2",
        senderId: "u2",
        sender: users[2],
        seen: [{ userId: "u0", seenAt: new Date("2025-02-17T20:05:00Z") }],
      },
    ],
  },
];

const ChatsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="hidden lg:block w-fit shrink-0 border-r border-gray-200 overflow-y-auto">
            <ChatList users={users} initialItems={conversations} />
          </div>
          <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ChatsLayout;
