"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  emptyMessage?: string;
  onSort?: (key: string) => void;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No records found.",
  onSort,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-card border border-line bg-white", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-subtle border-b border-line text-[12px] font-semibold text-ink-700 tracking-normal select-none">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn("px-4 py-3.5 whitespace-nowrap", col.className)}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => onSort?.(col.key)}
                    className="inline-flex items-center gap-1.5 hover:text-ink-900 transition-colors font-semibold"
                  >
                    <span>{col.header}</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-ink-400 stroke-[2]" />
                  </button>
                ) : (
                  <span>{col.header}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line text-[14px] text-ink-700">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-10 text-center text-ink-400 text-[13px]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={keyExtractor(row, idx)}
                className="hover:bg-[#F9FBFE] transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("px-4 py-3.5 align-middle", col.className)}
                  >
                    {col.render
                      ? col.render(row, idx)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
