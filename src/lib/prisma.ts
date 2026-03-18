import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { envs } from "../config/envs";

const pool = new pg.Pool({ connectionString: envs.DATABASE_URL });

// Fixed type discrepancy between pg version and adapter-pg expectations
const adapter = new PrismaPg(pool as any);

export const prisma = new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
});