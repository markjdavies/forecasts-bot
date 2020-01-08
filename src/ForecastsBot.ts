import Telegraf from 'telegraf';
import { ForecastsContext } from './ForecastsContext';
import { Settings } from './Settings';

export default (settings: Settings): Telegraf<ForecastsContext> => {
    return new Telegraf(settings.tokenId);
};
