"use client";
import { Expense } from "@/lib/types";

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: Props) {
  async function handleDelete(id: string) {
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    onDelete(id);
  }

  if (expenses.length === 0) {
    return <p className="text-gray-500 text-sm">No expenses yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {expenses.map((e) => (
        <li
          key={e.id}
          className="flex items-center justify-between bg-white rounded shadow px-4 py-3"
        >
          <div>
            <span className="font-medium">{e.name}</span>
            <span className="ml-2 text-sm text-gray-500">{e.category}</span>
            <span className="ml-2 text-sm text-gray-400">{e.date}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">${e.amount.toFixed(2)}</span>
            <button
              onClick={() => handleDelete(e.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
