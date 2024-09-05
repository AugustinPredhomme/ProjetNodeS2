import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator"
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres/driver";

import { env } from "./env";
const { DATABASE_URL } = env;

async function main() {
    const pool = new Pool({ connectionString: DATABASE_URL });

    const db: NodePgDatabase = drizzle(pool);

    console.info("Migrating database....... loading");

    await migrate(db, { migrationsFolder: 'migrations' });

    console.info("Database migrated successfully!");

    await pool.end();
}

main();