import fs from "fs";
import path from "path";
import { Expense } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "expenses.json");

function readAll(): Expense[] {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Expense[];
}

function writeAll(expenses: Expense[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2), "utf-8");
}

export function getExpenses(): Expense[] {
  return readAll();
}

export function addExpense(expense: Expense): Expense {
  const expenses = readAll();
  expenses.push(expense);
  writeAll(expenses);
  return expense;
}

export function deleteExpense(id: string): boolean {
  const expenses = readAll();
  const filtered = expenses.filter((e) => e.id !== id);
  if (filtered.length === expenses.length) return false;
  writeAll(filtered);
  return true;
}
