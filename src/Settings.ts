import { Logger } from 'pino';
import { DataOperations } from './dal/DataOperations';

export class Settings {
    tokenId: string;
    dataOperations: DataOperations;
    log: Logger;
}
