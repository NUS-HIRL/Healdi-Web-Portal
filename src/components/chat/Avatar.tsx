"use client";

import Image from "next/image";
import { UserType } from "@/types/chat";

interface AvatarProps {
  user?: UserType;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div
      className="
          relative
          inline-block
          rounded-full
          overflow-hidden
          h-9
          w-9
          md:h-11
          md:w-11
        "
    >
      <Image
        alt="Avatar"
        src={user?.image || "/chat/placeholder-avatar.svg"}
        height={256}
        width={256}
      />
    </div>
  );
};

export default Avatar;
