import * as z from 'zod';

export const dbConnectionConfigModel = z.object({
    user: z.string(),
    password: z.string(),
    server: z.string(),
    database: z.string(),
    port: z.number().optional(),
    encrypt: z.boolean().optional(),
});

export type DbConnectionConfig = z.infer<typeof dbConnectionConfigModel>;
