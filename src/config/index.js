const SECRET_DB = require('./SECRET')
module.exports = {
  username: "jeans",
  password: SECRET_DB,
  database: "CodeHunter",
  host: "127.0.0.1",
  dialect: "postgres",
  define: {
    timestamps: true
  }
};
