/**
 * @jest-environment node
 */
import { POST } from "@/app/api/expenses/route";

jest.mock("@/lib/store", () => ({
  addExpense: jest.fn((expense) => expense),
}));

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validExpense = {
  name: "Lunch",
  amount: 12.5,
  category: "Food",
  date: "2026-04-08",
};

describe("POST /api/expenses validation", () => {
  it("returns 201 for a valid expense", async () => {
    const res = await POST(makeRequest(validExpense));
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.name).toBe("Lunch");
    expect(data.amount).toBe(12.5);
  });

  // name validation
  it("returns 400 when name is missing", async () => {
    const res = await POST(makeRequest({ ...validExpense, name: undefined }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when name is empty", async () => {
    const res = await POST(makeRequest({ ...validExpense, name: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when name is whitespace only", async () => {
    const res = await POST(makeRequest({ ...validExpense, name: "   " }));
    expect(res.status).toBe(400);
  });

  // amount validation
  it("returns 400 when amount is missing", async () => {
    const res = await POST(makeRequest({ ...validExpense, amount: undefined }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when amount is not a number", async () => {
    const res = await POST(makeRequest({ ...validExpense, amount: "abc" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when amount is 0", async () => {
    const res = await POST(makeRequest({ ...validExpense, amount: 0 }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when amount is negative", async () => {
    const res = await POST(makeRequest({ ...validExpense, amount: -5 }));
    expect(res.status).toBe(400);
  });

  // date validation
  it("returns 400 when date is missing", async () => {
    const res = await POST(makeRequest({ ...validExpense, date: undefined }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when date is not a valid ISO date", async () => {
    const res = await POST(makeRequest({ ...validExpense, date: "not-a-date" }));
    expect(res.status).toBe(400);
  });

  // category validation
  it("returns 400 when category is missing", async () => {
    const res = await POST(makeRequest({ ...validExpense, category: undefined }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when category is empty", async () => {
    const res = await POST(makeRequest({ ...validExpense, category: "" }));
    expect(res.status).toBe(400);
  });

  // multiple errors
  it("returns all validation errors at once", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.errors).toHaveLength(4);
  });
});
