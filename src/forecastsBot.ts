import Telegraf, { Middleware } from 'telegraf';
import { ForecastsContext } from './ForecastsContext';
import { Settings } from './Settings';
import { RoundDate } from './dataModel/RoundDate';
import * as moment from 'moment';
import { PlayerFixtureDate } from './dataModel/PlayerFixtureDate';

export const forecastsBot = (
    settings: Settings,
    middlewares: Middleware<ForecastsContext>[]
): Telegraf<ForecastsContext> => {
    const bot = new Telegraf(settings.tokenId);
    const operations = settings.dataOperations;

    middlewares.map((mw: Middleware<ForecastsContext>) => bot.use(mw));

    bot.start((ctx: ForecastsContext) => {
        if (ctx.player) {
            ctx.reply(`Evening, ${ctx.player.displayName}.`);
        } else {
            ctx.reply('Evening, chief.');
        }
    });

    bot.command('good', (ctx: ForecastsContext) =>
        ctx.reply('Good, good, good!')
    );

    bot.command('whoami', (ctx: ForecastsContext) => {
        if (ctx.player) {
            ctx.reply(ctx.player.displayName);
        } else {
            ctx.reply(`I don't know`);
        }
    });

    bot.command('nextfixture', async (ctx: ForecastsContext) => {
        const nextFixtures: RoundDate = await operations.GetNextFixture();
        const formattedDate = moment(nextFixtures.date).format('ddd Do MMM');
        ctx.reply(`Next matches: ${formattedDate} (${nextFixtures.roundName})`);
    });

    bot.command('mynextfixture', async (ctx: ForecastsContext) => {
        if (ctx.player) {
            const nextFixtures: PlayerFixtureDate = await operations.GetMyNextFixture(
                ctx.player.playerId
            );
            const homeOrAway = nextFixtures.awayTeam ? 'H' : 'A';
            const formattedDate = moment(nextFixtures.date).format(
                'ddd Do MMM'
            );
            const opponent = nextFixtures.homeTeam
                ? nextFixtures.homeTeam
                : nextFixtures.awayTeam;
            ctx.reply(
                `Next match: (${homeOrAway}) ${formattedDate} (${nextFixtures.roundName}) v ${opponent}`
            );
        } else {
            ctx.reply('Who are you? Who are you?');
        }
    });

    return bot;
};
