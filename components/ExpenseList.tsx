"use client";
import { useState } from "react";
import { Expense } from "@/lib/types";

const CATEGORIES = ["All", "Food", "Transport", "Utilities", "Entertainment", "Other"];

interface Props {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: Props) {
  const [filterCategory, setFilterCategory] = useState("All");

  async function handleDelete(id: string) {
    await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    onDelete(id);
  }

  const filtered =
    filterCategory === "All"
      ? expenses
      : expenses.filter((e) => e.category === filterCategory);

  return (
    <div className="flex flex-col gap-3">
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="self-start border rounded px-3 py-1.5 text-sm"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No expenses yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {filtered.map((e) => (
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
      )}
    </div>
  );
}
