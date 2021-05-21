const Users = require("../auth/auth-model");
module.exports = async (req, res, next) => {
  const { username } = req.body;
  const isValid = await Users.findBy({ username }).first();
  if (isValid) {
    req.user = isValid;
    next();
  } else {
    next({ message: "invalid credentials" });
  }
};
