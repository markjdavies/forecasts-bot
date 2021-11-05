import * as Logger from 'pino';
import { MssqlDataOperations } from './dal/Mssql/MssqlDataOperations';
import { LogConfig, Settings, settingsModel } from './types';

const logConfig: LogConfig = {
    name: 'forecasts-bot',
    level: 'debug',
};

export const settings: Settings = settingsModel.parse({
    tokenId: process.env.tokenId,
    dbConfig: JSON.parse(process.env.db ?? ''),
    logConfig,
});

export const log = Logger.pino(logConfig);

export const dataOperations = new MssqlDataOperations(settings.dbConfig);
