import { Pool } from "pg";

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  database: 'Task',
  port: 5432
});
