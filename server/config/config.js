require('dotenv').config();

const config = {
  port: process.env.PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  jwt_token: process.env.JWT_TOKEN,
  jwt_refresh: process.env.JWT_REFRESH
};

module.exports = config;