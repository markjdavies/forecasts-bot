import * as z from 'zod';
import { dbConnectionConfigModel } from './dal/Mssql/DbConnectionConfig';

export const logConfigModel = z.object({
    name: z.string().min(1),
    level: z.string(),
});
export type LogConfig = z.infer<typeof logConfigModel>;

export const settingsModel = z.object({
    tokenId: z.string().min(1),
    dbConfig: dbConnectionConfigModel,
    logConfig: logConfigModel,
});

export type Settings = z.infer<typeof settingsModel>;
