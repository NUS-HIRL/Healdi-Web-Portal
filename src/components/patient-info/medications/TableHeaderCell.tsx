"use client";

import { ArrowUpDown } from "lucide-react";

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
    <th className="px-4 py-3 font-medium">
      {noSort ? (
        content
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-1 text-left hover:text-gray-900"
          aria-pressed={!!active}
          aria-label={`Sort by ${label}${active ? ` (${dir})` : ""}`}
        >
          {content}
        </button>
      )}
    </th>
  );
}
