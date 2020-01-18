import Telegraf, { Middleware } from 'telegraf';
import { ForecastsContext } from './ForecastsContext';
import { Settings } from './Settings';
import { RoundDate } from './dataModel/RoundDate';
import * as moment from 'moment';

export const forecastsBot = (
    settings: Settings,
    middlewares: Middleware<ForecastsContext>[]
): Telegraf<ForecastsContext> => {
    const bot = new Telegraf(settings.tokenId);
    const operations = settings.dataOperations;

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

    bot.hears(/\/nextFixture/i, async (ctx: ForecastsContext) => {
        const nextFixtures: RoundDate = await operations.GetNextFixture();
        const formattedDate = moment(nextFixtures.date).format('ddd Do MMM');
        ctx.reply(`Next matches: ${formattedDate} (${nextFixtures.roundName})`);
    });

    bot.command('casetestlower', (ctx: ForecastsContext) => {
        /* eslint-disable-next-line no-console */
        console.log(ctx.message);
        ctx.reply('Case test lower');
    });

    bot.command('casetestlowernoslash', (ctx: ForecastsContext) => {
        ctx.reply('Case test lower');
    });

    bot.command('caseTestCamel', (ctx: ForecastsContext) => {
        ctx.reply('Case test camel');
    });

    return bot;
};
