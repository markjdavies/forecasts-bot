import Telegraf, { Middleware } from 'telegraf';
import { ForecastsContext } from './ForecastsContext';
import { Settings } from './Settings';

export default (
    settings: Settings,
    middlewares: Middleware<ForecastsContext>[]
): Telegraf<ForecastsContext> => {
    const bot = new Telegraf(settings.tokenId);

    middlewares.map((mw: Middleware<ForecastsContext>) => bot.use(mw));

    bot.hears(/start/i, (ctx: ForecastsContext) => {
        if (ctx.player) {
            ctx.reply(`Evening, ${ctx.player.displayName}.`);
        } else {
            ctx.reply('Evening, chief.');
        }
    });

    bot.hears(/\/good/, (ctx: ForecastsContext) =>
        ctx.reply('Good, good, good!')
    );

    return bot;
};
