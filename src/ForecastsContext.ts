import { Player } from './dataModel/Player';
import { DataOperations } from './dal/DataOperations';
import { VercelRequest } from '@vercel/node';
import { Logger } from 'pino';

export interface ForecastsContext extends VercelRequest {
    dataOperations?: DataOperations;
    player?: Player;
    log?: Logger;
}
