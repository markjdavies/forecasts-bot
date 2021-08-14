import * as z from 'zod';

export const DbConnectionConfigModel = z.object({
    dbUsername: z.string(),
    dbPassword: z.string(),
    dbHostName: z.string(),
    databaseName: z.string(),
});

export type DbConnectionConfig = z.infer<typeof DbConnectionConfigModel>;