import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPool, sql } from "../db";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ ok: false, error: "Missing credentials" });

    const pool = await getPool();
    const result = await pool
      .request()
      .input("email", sql.NVarChar(255), email)
      .query("SELECT TOP 1 id, email, password_hash, role FROM users WHERE email = @email");

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ ok: false, error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ ok: false, error: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({ ok: true, data: { token } });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Server error" });
  }
});