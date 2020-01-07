import { ContextMessageUpdate } from 'telegraf';
import { Player } from './dataModel/Player';
import { DataOperations } from './dal/DataOperations';

export interface ForecastsContext extends ContextMessageUpdate {
    dataOperations?: DataOperations;
    player?: Player;
}
