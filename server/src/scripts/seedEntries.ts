import prisma from "../db.js";
import seedData from "./seedData.js";

async function seedDatabase() {
  try {
    console.log("Starting DevLog seed...");

    await prisma.entry.deleteMany();

    await prisma.entry.createMany({
      data: seedData.map((entry) => ({
        title: entry.title,
        date: entry.date,
        summary: entry.summary,
        tags: entry.tags.join(","),
        mood: entry.mood,
        createdAt: new Date(entry.createdAt),
      })),
    });

    console.log(`Seed complete. Inserted ${seedData.length} entries.`);
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();