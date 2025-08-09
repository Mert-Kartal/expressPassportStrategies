import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import authRoutes from "../auth/router";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("API çalışıyor!");
});
app.use("/api/auth", authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

export { app };
