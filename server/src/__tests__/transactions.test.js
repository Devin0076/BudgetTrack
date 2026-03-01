const request = require("supertest");
const app = require("../app");
const pool = require("../db");

function uniqueEmail() {
  return `tx_${Date.now()}@example.com`;
}

async function registerAndLogin() {
  const email = uniqueEmail();
  const password = "password123";

  await request(app).post("/api/auth/register").send({ email, password });

  const loginRes = await request(app).post("/api/auth/login").send({ email, password });

  return loginRes.body.token;
}

describe("Transactions endpoints", () => {
  it("creates a transaction for the authenticated user", async () => {
    const token = await registerAndLogin();

    const res = await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 10.5,
        category: "Food",
        type: "expense",
        date: "2026-02-23",
        description: "Snack",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.transaction).toBeDefined();
    expect(res.body.transaction.category).toBe("Food");
    expect(res.body.transaction.type).toBe("expense");
  });

  it("lists transactions for the authenticated user", async () => {
    const token = await registerAndLogin();

    await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 20,
        category: "Bills",
        type: "expense",
        date: "2026-02-23",
        description: "Internet",
      });

    const res = await request(app)
      .get("/api/transactions")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.transactions)).toBe(true);
    expect(res.body.transactions.length).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  await pool.end();
});