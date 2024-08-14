require("dotenv").config();
console.log("process.env.CLOUD_DB_HOST:", process.env.CLOUD_DB_HOST);

console.log("process.env", process.env.DB_HOST);
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.CLOUD_DB_HOST,
      user: process.env.CLOUD_DB_USER,
      password: process.env.CLOUD_DB_PASSWORD,
      database: process.env.CLOUD_DB_NAME,
      port: process.env.CLOUD_DB_PORT,
    },
    migrations: {
      directory: "./db/migrations",
    },
  },
};
