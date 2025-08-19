// components/SystemNotice.tsx
"use client";

import clsx from "clsx";

export default function SystemNotice({
  text
}: {
  text: string;
}) {
  return (
    <div className="px-4 h-fit">
      <div
        className={clsx(
          "w-full rounded-full p-2 text-xs font-medium h-10",
          "bg-sky-100 text-sky-500",
          "flex items-center"
        )}
      >
        {text}
      </div>
    </div>
  );
}
