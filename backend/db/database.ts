import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(__dirname, "properties.db");
const db = new Database(dbPath);

export default db;
