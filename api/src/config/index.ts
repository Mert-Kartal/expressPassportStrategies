import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const SECRET_OR_KEY = process.env.JWT_SECRET || "supersecretkey";

export * from "./server";
export * from "./db";
