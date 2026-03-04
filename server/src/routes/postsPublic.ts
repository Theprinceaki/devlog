import { Router } from "express";
import { getPool, sql } from "../db";

export const postsPublicRouter = Router();

postsPublicRouter.get("/", async (_req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT id, title, slug, excerpt, tags, cover_url, published_at
      FROM posts
      WHERE status = 'published'
      ORDER BY published_at DESC
    `);

    return res.json({ ok: true, data: result.recordset });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Server error" });
  }
});

postsPublicRouter.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const pool = await getPool();
    const result = await pool
      .request()
      .input("slug", sql.NVarChar(255), slug)
      .query(`
        SELECT id, title, slug, excerpt, content, tags, cover_url, published_at
        FROM posts
        WHERE slug = @slug AND status = 'published'
      `);

    const post = result.recordset[0];
    if (!post) return res.status(404).json({ ok: false, error: "Not found" });

    return res.json({ ok: true, data: post });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? "Server error" });
  }
});