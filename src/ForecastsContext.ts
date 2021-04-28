import { Context } from 'telegraf';
import { Player } from './dataModel/Player';
import { DataOperations } from './dal/DataOperations';

export interface ForecastsContext extends Context {
    dataOperations?: DataOperations;
    player?: Player;
}
