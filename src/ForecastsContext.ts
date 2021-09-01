import { Player } from './dataModel/Player';
import { DataOperations } from './dal/DataOperations';
import { VercelRequest } from '@vercel/node';

export interface ForecastsContext extends VercelRequest {
    dataOperations?: DataOperations;
    player?: Player;
}
