import { useMemo } from 'react';
import { Chat, UserType } from '@/types/chat'

const useOtherUser = (
  chat: Chat | { users: UserType[] }
) => {

  const otherUser = useMemo(() => {
    const currentUserEmail = 'johndoe@example.com'

    const otherUser = chat.users.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser[0];
  }, [chat.users]);
  return otherUser;
};

export default useOtherUser;