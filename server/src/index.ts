import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
import { postsPublicRouter } from "./routes/postsPublic";
import { postsAdminRouter } from "./routes/postsAdmin";

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => res.json({ ok: true, data: "up" }));

app.use("/api/auth", authRouter);
app.use("/api/posts", postsPublicRouter);
app.use("/api/admin/posts", postsAdminRouter);

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));