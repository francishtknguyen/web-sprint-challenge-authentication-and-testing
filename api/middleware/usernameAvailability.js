const Users = require("../auth/auth-model");
module.exports = async (req, res, next) => {
  const { username } = req.body;
  const user = await Users.findBy({ username }).first();
  if (user) {
    next({ status: 409, message: "username taken" });
  } else {
    next();
  }
};
