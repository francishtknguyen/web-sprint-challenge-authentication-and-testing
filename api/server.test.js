const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("./server");

const user1 = {
  username: "francis",
  password: "1234",
};
const user2 = {
  username: "celina",
  password: "1234",
};
const userWrongPassword = {
  username: "celina",
  password: "12345",
};
const badUser = {
  password: "1234",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe("[POST] /api/auth/register", () => {
  test("sanity", () => {
    expect(true).not.toBe(false);
  });
  test("errors when missing a username", async () => {
    const res = await request(server).post("/api/auth/register").send(badUser);
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/username and password required/i);
  });
  test("adds user to db", async () => {
    const res = await request(server).post("/api/auth/register").send(user1);
    let users = await db("users");
    expect(res.body).toMatchObject({ id: 1, username: "francis" });
    expect(res.status).toBe(201);
    expect(users).toHaveLength(1);
    const res2 = await request(server).post("/api/auth/register").send(user2);
    users = await db("users");
    expect(res2.body).toMatchObject({ id: 2, username: "celina" });
    expect(res2.status).toBe(201);
    expect(users).toHaveLength(2);
  });
});
describe("[POST] /api/auth/login", () => {
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send(user1);
    await request(server).post("/api/auth/register").send(user2);
  });
  test("sanity", () => {
    expect(true).not.toBe(false);
  });
  test("errors when missing a username", async () => {
    const res = await request(server).post("/api/auth/login").send(badUser);
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/username and password required/i);
  });
  test("successful login returns correct body", async () => {
    const res = await request(server).post("/api/auth/login").send(user1);
    expect(res.body).toHaveProperty("message", "welcome, francis");
  });
  test("wrong password return invalid credentials", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send(userWrongPassword);
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });
});
