import { envs } from "#config/envs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";

const connectionString = envs.DATABASE_URL;
const adapter = new PrismaPg({connectionString});

export const prisma = new PrismaClient({adapter});