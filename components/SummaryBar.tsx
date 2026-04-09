"use client";
import { Expense } from "@/lib/types";

interface SummaryBarProps {
  expenses: Expense[];
}

export default function SummaryBar({ expenses }: SummaryBarProps) {
  const totalCount = expenses.length;
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  if (totalCount === 0) return null;

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {totalCount} expense{totalCount !== 1 ? "s" : ""}
        </span>
        <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(categoryTotals)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([category, amount]) => (
            <span
              key={category}
              className="text-xs bg-white rounded px-2 py-1 text-gray-700"
            >
              {category}: ${amount.toFixed(2)}
            </span>
          ))}
      </div>
    </div>
  );
}
