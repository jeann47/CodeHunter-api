const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.adminpass;
  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  // eslint-disable-next-line no-unused-vars
  const [scheme, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, "adminSecret");
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    return res.status(401).send({ error: "Token invalid" });
  }
};
