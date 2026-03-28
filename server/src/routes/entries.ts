import { Router } from "express";
import { z } from "zod";
import prisma from "../db.js";

const router = Router();

const entryBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255, "Title is too long"),
  summary: z.string().trim().min(1, "Summary is required"),
  mood: z.string().trim().optional().default("no mood logged"),
  tags: z.array(z.string().trim()).optional().default([]),
});

function parseTags(tags: string): string[] {
  return tags
    .split(",")
    .map((tag: string) => tag.trim())
    .filter(Boolean);
}

router.get("/", async (_req, res) => {
  try {
    const entries = await prisma.entry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      entries: entries.map((entry: (typeof entries)[number]) => ({
        ...entry,
        tags: entry.tags ? parseTags(entry.tags) : [],
      })),
    });
  } catch (error) {
    console.error("Failed to fetch entries:", error);

    res.status(500).json({
      message: "Failed to fetch entries",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid entry id",
      });
    }

    const entry = await prisma.entry.findUnique({
      where: { id },
    });

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found",
      });
    }

    return res.json({
      entry: {
        ...entry,
        tags: entry.tags ? parseTags(entry.tags) : [],
      },
    });
  } catch (error) {
    console.error("Failed to fetch entry:", error);

    return res.status(500).json({
      message: "Failed to fetch entry",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const parsed = entryBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
    }

    const { title, summary, mood, tags } = parsed.data;
    const now = new Date();

    const entry = await prisma.entry.create({
      data: {
        title,
        date: now.toLocaleDateString(),
        summary,
        mood: mood.trim() || "no mood logged",
        tags: tags.map((tag) => tag.trim()).filter(Boolean).join(","),
      },
    });

    return res.status(201).json({
      entry: {
        ...entry,
        tags: entry.tags ? parseTags(entry.tags) : [],
      },
    });
  } catch (error) {
    console.error("Failed to create entry:", error);

    return res.status(500).json({
      message: "Failed to create entry",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid entry id",
      });
    }

    const parsed = entryBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
    }

    const { title, summary, mood, tags } = parsed.data;

    const entry = await prisma.entry.update({
      where: { id },
      data: {
        title,
        summary,
        mood: mood.trim() || "no mood logged",
        tags: tags.map((tag) => tag.trim()).filter(Boolean).join(","),
      },
    });

    return res.json({
      entry: {
        ...entry,
        tags: entry.tags ? parseTags(entry.tags) : [],
      },
    });
  } catch (error) {
    console.error("Failed to update entry:", error);

    return res.status(500).json({
      message: "Failed to update entry",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid entry id",
      });
    }

    await prisma.entry.delete({
      where: { id },
    });

    return res.json({
      message: "Entry deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete entry:", error);

    return res.status(500).json({
      message: "Failed to delete entry",
    });
  }
});

export default router;