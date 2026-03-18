import { PrismaClient } from "@prisma/client";
import { envs } from "./src/config/envs";

const prisma = new PrismaClient({
    accelerateUrl: envs.DATABASE_URL
});

console.log("Attempting to connect to Prisma...");
prisma.$connect()
    .then(() => {
        console.log("Successfully connected to Prisma");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Failed to connect to Prisma:", err);
        process.exit(1);
    });
