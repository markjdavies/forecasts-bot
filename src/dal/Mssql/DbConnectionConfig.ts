import * as z from 'zod';

export const dbConnectionConfigModel = z.object({
    user: z.string(),
    password: z.string(),
    server: z.string(),
    database: z.string(),
});

export type DbConnectionConfig = z.infer<typeof dbConnectionConfigModel>;
