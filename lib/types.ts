export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string; // ISO 8601, e.g. "2026-04-08"
}
