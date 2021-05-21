const db = require("../data/dbConfig");
const Users = require("../api/auth/auth-model");
const { clean } = require("");

const user1 = {
  username: "francis",
  password: "1234",
};
const user2 = {
  username: "celina",
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
});
describe("[POST] /api/auth/login", () => {
  test("sanity", () => {
    expect(true).not.toBe(false);
  });
});
