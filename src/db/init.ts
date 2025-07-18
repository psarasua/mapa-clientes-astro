import Database from "better-sqlite3";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const dbFile = join(process.cwd(), "src", "db", "database.sqlite");
const db = new Database(dbFile);

// Ejecutar todos los scripts de la carpeta schemas
const schemasDir = join(process.cwd(), "src", "db", "schemas");
const schemaFiles = readdirSync(schemasDir).filter((f) => f.endsWith(".sql"));

for (const file of schemaFiles) {
  const sql = readFileSync(join(schemasDir, file), "utf-8");
  db.exec(sql);
}

export default db;
