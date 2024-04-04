const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  SALT_VALUE: process.env.SALT_VALUE,
};
