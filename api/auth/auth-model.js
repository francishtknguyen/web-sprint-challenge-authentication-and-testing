const db = require("../../data/dbConfig");

function getAll() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findByID(id) {
  return db("users").select("id", "username").where({ id }).first();
}

async function create({ username, password }) {
  const [id] = await db("users").insert({ username, password });
  return await findByID(id);
}

module.exports = { getAll, findBy, findByID, create };
