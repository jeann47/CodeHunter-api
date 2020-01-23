/* eslint-disable no-unused-vars */

const jwt = require("jsonwebtoken");

const { promisify } = require("util");

module.exports = {
  async auth(header) {
    const authHeader = header.authorization;

    if (!authHeader) return null;

    const [scheme, token] = authHeader.split(" ");

    try {
      const decoded = await promisify(jwt.verify)(token, "secret");
      return decoded.id;
    } catch (err) {
      return "Failed";
    }
  },
  async adminAuth(header) {
    const authHeader = header.adminpass;

    if (!authHeader) return null;

    const [scheme, token] = authHeader.split(" ");

    try {
      const decoded = await promisify(jwt.verify)(token, "adminSecret");
      return decoded.id;
    } catch (err) {
      return "Failed";
    }
  }
};

// const i = await auth(req.headers)
// console.log(i)
