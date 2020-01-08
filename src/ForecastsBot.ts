import Telegraf from 'telegraf';
import { ForecastsContext } from './ForecastsContext';
import { Settings } from './Settings';

export default (settings: Settings): Telegraf<ForecastsContext> => {
    const bot = new Telegraf(settings.tokenId);

    bot.hears(/ping/i, (ctx: ForecastsContext) => {
        ctx.reply('Pong!');
    });

    return bot;
};
