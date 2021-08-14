import { DbConnectionConfigModel } from './dal/Mssql/DbConnectionConfig';
import { MssqlDataOperations } from './dal/Mssql/MssqlDataOperations';

export const dbConfig = DbConnectionConfigModel.parse(JSON.parse(process.env.db));
export const dataOperations = new MssqlDataOperations(dbConfig);

export const settings = {
    tokenId: process.env.tokenId,
    dataOperations,
};
