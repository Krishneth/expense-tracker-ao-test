import fs from "fs";
import { getExpenses, addExpense, deleteExpense } from "@/lib/store";
import { Expense } from "@/lib/types";

jest.mock("fs");

const mockedFs = fs as jest.Mocked<typeof fs>;

const seedExpenses: Expense[] = [
  {
    id: "1",
    name: "Grocery",
    amount: 50,
    category: "Food",
    date: "2026-04-01",
  },
  {
    id: "2",
    name: "Bus pass",
    amount: 80,
    category: "Transport",
    date: "2026-04-02",
  },
];

beforeEach(() => {
  jest.resetAllMocks();
  mockedFs.readFileSync.mockReturnValue(JSON.stringify(seedExpenses));
  mockedFs.writeFileSync.mockImplementation(() => {});
});

describe("getExpenses", () => {
  it("returns the seeded expenses", () => {
    const result = getExpenses();
    expect(result).toEqual(seedExpenses);
  });
});

describe("addExpense", () => {
  it("persists a new expense and returns it", () => {
    const newExpense: Expense = {
      id: "3",
      name: "Coffee",
      amount: 5,
      category: "Food",
      date: "2026-04-03",
    };

    const result = addExpense(newExpense);

    expect(result).toEqual(newExpense);
    expect(mockedFs.writeFileSync).toHaveBeenCalledTimes(1);

    const written = JSON.parse(
      mockedFs.writeFileSync.mock.calls[0][1] as string
    );
    expect(written).toEqual([...seedExpenses, newExpense]);
  });
});

describe("deleteExpense", () => {
  it("removes the expense and returns true", () => {
    const result = deleteExpense("1");

    expect(result).toBe(true);
    expect(mockedFs.writeFileSync).toHaveBeenCalledTimes(1);

    const written = JSON.parse(
      mockedFs.writeFileSync.mock.calls[0][1] as string
    );
    expect(written).toEqual([seedExpenses[1]]);
  });

  it("returns false for a non-existent id", () => {
    const result = deleteExpense("non-existent");

    expect(result).toBe(false);
    expect(mockedFs.writeFileSync).not.toHaveBeenCalled();
  });
});
