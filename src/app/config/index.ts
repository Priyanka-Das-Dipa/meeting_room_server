import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_saltround : process.env.BCRYPT_SALTROUND,
  node_env : process.env.NODE_ENV
};
