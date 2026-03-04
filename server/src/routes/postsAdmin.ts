import { Router } from "express";
import { z } from "zod";
import { getPool, sql } from "../db";
import { requireAdmin } from "../middleware/requireAdmin";
import { slugify } from "../utils/slugify";

export const postsAdminRouter = Router();
postsAdminRouter.use(requireAdmin);

const PostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(1),
  status: z.enum(["draft", "published"]).optional(),
  tags: z.string().optional().nullable(),
  cover_url: z.string().optional().nullable(),
});

postsAdminRouter.get("/", async (_req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, title, slug, excerpt, status, tags, cover_url, created_at, updated_at, published_at
      FROM posts
      ORDER BY updated_at DESC
    `);
    return res.json({ ok: true, data: result.recordset });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Server error" });
  }
});

postsAdminRouter.post("/", async (req, res) => {
  try {
    const parsed = PostSchema.parse(req.body);
    const pool = await getPool();

    const slug = parsed.slug?.trim() ? slugify(parsed.slug) : slugify(parsed.title);
    const status = parsed.status ?? "draft";
    const publishedAtClause = status === "published" ? "SYSUTCDATETIME()" : "NULL";

    const result = await pool
      .request()
      .input("title", sql.NVarChar(255), parsed.title)
      .input("slug", sql.NVarChar(255), slug)
      .input("excerpt", sql.NVarChar(500), parsed.excerpt ?? null)
      .input("content", sql.NVarChar(sql.MAX), parsed.content)
      .input("status", sql.NVarChar(20), status)
      .input("tags", sql.NVarChar(255), parsed.tags ?? null)
      .input("cover_url", sql.NVarChar(500), parsed.cover_url ?? null)
      .query(`
        INSERT INTO posts (title, slug, excerpt, content, status, tags, cover_url, published_at)
        OUTPUT INSERTED.*
        VALUES (@title, @slug, @excerpt, @content, @status, @tags, @cover_url, ${publishedAtClause})
      `);

    return res.json({ ok: true, data: result.recordset[0] });
  } catch (e: any) {
    if (e?.issues) return res.status(400).json({ ok: false, error: e.issues[0]?.message ?? "Invalid" });
    return res.status(500).json({ ok: false, error: e?.message ?? "Server error" });
  }
});