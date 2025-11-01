

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ADMIN_CODE = process.env.ADMIN_CODE;
console.log("ADMIN_CODE from env:", ADMIN_CODE);

if (!ADMIN_CODE) {
  throw new Error("ADMIN_CODE is not defined in .env file");
}

export const signToken = (id) =>
  jwt.sign({ id }, ADMIN_CODE, { expiresIn: "30d" });

export const verifyToken = (token) => jwt.verify(token, ADMIN_CODE);
