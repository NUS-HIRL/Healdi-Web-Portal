"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SortDir = "asc" | "desc";

export default function TableHeaderCell({
  label,
  active,
  dir,
  onClick,
  noSort = false,
}: {
  label: string;
  active?: boolean;
  dir?: SortDir;
  onClick?: () => void;
  noSort?: boolean;
}) {
  const content = (
    <div className="flex items-center gap-1">
      <span>{label}</span>
      {!noSort && (
        <ArrowUpDown
          className={`h-4 w-4 ${active ? "text-gray-700" : "text-gray-400"}`}
          aria-hidden="true"
        />
      )}
    </div>
  );

  return (
    <th
      className="px-4 py-3 font-medium"
      aria-sort={
        active ? (dir === "asc" ? "ascending" : "descending") : ("none" as const)
      }
    >
      {noSort ? (
        content
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClick}
          className="h-auto px-0 py-0 text-left hover:text-gray-900"
        >
          {content}
        </Button>
      )}
    </th>
  );
}
