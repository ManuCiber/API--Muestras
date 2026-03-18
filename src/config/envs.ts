import "dotenv/config"
import z from "zod";

const envsSchema = z.object({
    PORT: z.string().min(1, 'PORT is required').transform(Number),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
});

type envType = z.infer<typeof envsSchema>;

const envParsed = envsSchema.safeParse(process.env);

if(!envParsed.success){
    console.error('Config validation error: ', envParsed.error.format())
    throw new Error('Invalid enviroment variables')
}

export const envs: envType = {
    PORT: envParsed.data.PORT,
    DATABASE_URL: envParsed.data.DATABASE_URL,
}