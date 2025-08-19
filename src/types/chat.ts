export interface UserType {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  body?: string;
  image?: string;
  createdAt: Date;
  chatId: string;
  senderId: string;
  sender: UserType;
  seen: { userId: string; seenAt: Date }[];
}

export interface Chat {
  id: string;
  createdAt: Date;
  lastMessageAt: Date;
  users: UserType[];
  messages: Message[];
}
