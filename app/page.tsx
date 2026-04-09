"use client";
import { useEffect, useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import SummaryBar from "@/components/SummaryBar";
import { Expense } from "@/lib/types";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetch("/api/expenses")
      .then((r) => r.json())
      .then(setExpenses);
  }, []);

  function handleAdd(expense: Expense) {
    setExpenses((prev) => [...prev, expense]);
  }

  function handleDelete(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Expense Tracker</h1>
      <ExpenseForm onAdd={handleAdd} />
      <SummaryBar expenses={expenses} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </main>
  );
}
