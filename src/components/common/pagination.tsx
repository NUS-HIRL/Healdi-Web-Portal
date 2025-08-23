"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

type PaginationProps = {
  page: number;
  pageCount: number;
  pageSize: number;
  openPageSize: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setOpenPageSize: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Pagination = ({
  page,
  pageCount,
  pageSize,
  openPageSize,
  setPage,
  setPageSize,
  setOpenPageSize,
}: PaginationProps) => {
  return (
    <div className="mt-4 flex items-center justify-end gap-2 relative">
      <Button
        type="button"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        variant="outline"
        size="icon"
        className="text-gray-500"
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="min-w-[2rem] bg-gray-100 text-gray-700"
        aria-current="page"
        disabled
      >
        {page}
      </Button>

      <Button
        type="button"
        onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
        variant="outline"
        size="icon"
        className="text-gray-600"
        aria-label="Next page"
        disabled={page >= pageCount}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="ml-2 relative">
        <Button
          type="button"
          onClick={() => setOpenPageSize((o) => !o)}
          variant="outline"
          size="sm"
          className="gap-1 text-gray-700"
          aria-haspopup="listbox"
          aria-expanded={openPageSize}
        >
          {pageSize} / page
          <ChevronDown className="h-4 w-4" />
        </Button>

        {openPageSize && (
          <div
            className="absolute right-0 z-10 mt-1 w-28 overflow-hidden rounded-md border border-gray-200 bg-white shadow"
            role="listbox"
          >
            {[5, 10, 20].map((s) => (
              <Button
                key={s}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPageSize(s);
                  setOpenPageSize(false);
                  setPage(1);
                }}
                className={`w-full justify-start px-3 ${
                  s === pageSize ? "bg-gray-100" : ""
                }`}
                role="option"
                aria-selected={s === pageSize}
              >
                {s} / page
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
