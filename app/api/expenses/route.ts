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

  const errors: string[] = [];

  if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
    errors.push("name is required and must be a non-empty string");
  }

  if (
    body.amount === undefined ||
    body.amount === null ||
    typeof body.amount !== "number" ||
    !Number.isFinite(body.amount) ||
    body.amount <= 0
  ) {
    errors.push("amount is required and must be a number greater than 0");
  }

  if (!body.date || typeof body.date !== "string" || isNaN(Date.parse(body.date))) {
    errors.push("date is required and must be a valid ISO date string");
  }

  if (!body.category || typeof body.category !== "string" || body.category.trim() === "") {
    errors.push("category is required and must be a non-empty string");
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const expense: Expense = {
    id: uuidv4(),
    name: body.name,
    amount: body.amount,
    category: body.category,
    date: body.date,
  };
  const created = addExpense(expense);
  return NextResponse.json(created, { status: 201 });
}
