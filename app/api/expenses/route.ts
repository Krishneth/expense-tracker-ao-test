import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { addExpense, getExpenses } from "@/lib/store";
import { Expense } from "@/lib/types";

export async function GET() {
  const expenses = getExpenses();
  return NextResponse.json(expenses);
}

export async function POST(request: Request) {
  const body = await request.json();
  const expense: Expense = {
    id: uuidv4(),
    name: body.name,
    amount: Number(body.amount),
    category: body.category,
    date: body.date,
  };
  const created = addExpense(expense);
  return NextResponse.json(created, { status: 201 });
}
