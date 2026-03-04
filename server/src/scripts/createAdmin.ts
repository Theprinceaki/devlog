import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcrypt";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { getPool, sql } from "../db";

dotenv.config();

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log("Usage: npx ts-node src/scripts/createAdmin.ts email password");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  const pool = await getPool();

  await pool
    .request()
    .input("email", sql.NVarChar(255), email)
    .input("hash", sql.NVarChar(255), hash)
    .query("INSERT INTO users (email, password_hash, role) VALUES (@email, @hash, 'admin')");

  console.log("✅ Admin created:", email);
  process.exit(0);
}

main().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});