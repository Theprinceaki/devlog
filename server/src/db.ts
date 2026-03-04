import sql from "mssql/msnodesqlv8";

function normalizeServerName(s: string | undefined) {
  if (!s) return s;
  if (s.startsWith(".\\")) return "localhost\\" + s.slice(2);
  return s;
}

const serverName = normalizeServerName(process.env.SQL_SERVER);
const odbcDriver = process.env.SQL_ODBC_DRIVER || "ODBC Driver 18 for SQL Server";

// Windows auth via ODBC connection string
const connectionString =
  `Driver={${odbcDriver}};` +
  `Server=${serverName};` +
  `Database=${process.env.SQL_DATABASE};` +
  `Trusted_Connection=Yes;` +
  `TrustServerCertificate=${process.env.SQL_TRUST_CERT === "true" ? "Yes" : "No"};`;

const config: any = { connectionString };

let pool: sql.ConnectionPool | null = null;

export async function getPool() {
  if (pool) return pool;
  pool = await sql.connect(config);
  return pool;
}

export { sql };