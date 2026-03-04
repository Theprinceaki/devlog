import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ ok: false, error: "Missing token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };
    if (payload.role !== "admin") return res.status(403).json({ ok: false, error: "Forbidden" });

    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
}