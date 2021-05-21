module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 401, message: "username and password required" });
  } else {
    next();
  }
};
