import { Player } from './dataModel/Player';
import { DataOperations } from './dal/DataOperations';
import { pino } from 'pino';
import { Context } from 'grammy';

export interface ForecastsContext extends Context {
    dataOperations?: DataOperations;
    player?: Player;
    log: pino.Logger;
}
