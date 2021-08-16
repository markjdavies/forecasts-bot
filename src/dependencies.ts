import * as pino from 'pino';
import { DbConnectionConfigModel } from './dal/Mssql/DbConnectionConfig';
import { MssqlDataOperations } from './dal/Mssql/MssqlDataOperations';

export const log = pino({
    name: 'forecasts-bot',
    level: 'debug',
});

export const dbConfig = DbConnectionConfigModel.parse(
    JSON.parse(process.env.db)
);
export const dataOperations = new MssqlDataOperations(dbConfig);

export const settings = {
    tokenId: process.env.tokenId,
    dataOperations,
    log,
};
