const mysql = require("mysql");
const config = require("./config.js");

const serverConfig = {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  connectionLimit: 100,
};

const pool = mysql.createPool(serverConfig);

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("[Server]: Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("[Server]: Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("[Server]: Database connection was refused.");
    }
  }

  if (connection) {
    connection.release();
  }

  return;
});

//Attempt to catch disconnects
pool.on("connection", function (connection) {
  console.log("[Server]: Connected to MySQL server ✅");

  connection.on("error", function (err) {
    console.error("[Server]: ", new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error("[Server]: ", new Date(), "MySQL close", err);
  });
});

module.exports = pool;
