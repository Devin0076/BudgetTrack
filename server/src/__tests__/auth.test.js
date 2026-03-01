const request = require("supertest");
const app = require("../app");
const pool = require("../db");

function uniqueEmail() {
  return `test_${Date.now()}@example.com`;
}

describe("Auth endpoints", () => {
  it("registers a new user and returns user object", async () => {
    const email = uniqueEmail();

    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password: "password123" });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(email);
    expect(res.body.user.id).toBeDefined();
  });

  it("logs in and returns a JWT token", async () => {
    const email = uniqueEmail();

    await request(app)
      .post("/api/auth/register")
      .send({ email, password: "password123" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe("string");
    expect(res.body.token.length).toBeGreaterThan(20);
  });
});

afterAll(async () => {
  await pool.end();
});