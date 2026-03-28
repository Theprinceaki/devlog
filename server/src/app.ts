import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import entriesRouter from "./routes/entries.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Devlog API is online",
  });
});

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "devlog-api",
  });
});

app.use("/entries", entriesRouter);

export default app;