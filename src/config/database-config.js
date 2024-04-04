const mongoose = require("mongoose");
const ServerConfig = require("./server-config.js");

async function connect() {
  await mongoose.connect(ServerConfig.DB_URI);
}

module.exports = { connect };
