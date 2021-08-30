import * as TelegramBot from 'node-telegram-bot-api';
import { Settings } from './Settings';
import { VercelRequest, VercelResponse } from '@vercel/node';
// import { RoundDate } from './dataModel/RoundDate';
// import { format } from 'fecha';
// import { PlayerFixtureDate } from './dataModel/PlayerFixtureDate';

export const forecastsBot = (
    settings: Settings
    // middlewares: Middleware<ForecastsContext>[]
): ((req: VercelRequest, _res: VercelResponse) => Promise<void>) => {
    const { log } = settings;
    const bot = new TelegramBot(settings.tokenId);
    return async (req: VercelRequest, _res: VercelResponse): Promise<void> => {
        const { body } = req;

        if (body.message) {
            const {
                chat: { id },
                text,
            } = body.message;

            let message: string;

            switch (text) {
                case '/start':
                    log.debug('Bot started');
                    message = 'Evening, chief.';
                    break;
                case '/good':
                    log.info("Heard 'good'");
                    message = 'Good, good, good!';
                    break;
                case '/whoami':
                    log.info("Heard 'whoami'");
                    message = "I don't know";
                    break;
                default:
                    log.info('Unrecognised command.');
                    message = `I hear you saying '${text}' to me.`;
            }

            await bot.sendMessage(id, message, { parse_mode: 'Markdown' });
        }
    };

    // const operations = settings.dataOperations;

    // middlewares.map((mw: Middleware<ForecastsContext>) => bot.use(mw));

    // bot.start((ctx: ForecastsContext) => {
    //     log.debug('Bot started');
    //     if (ctx.player) {
    //         ctx.reply(`Evening, ${ctx.player.displayName}.`);
    //     } else {
    //         ctx.reply('Evening, chief.');
    //     }
    // });

    // bot.command('good', (ctx: ForecastsContext) => {
    //     log.info("Heard 'good'");
    //     ctx.reply('Good, good, good!');
    // });

    // bot.command('whoami', (ctx: ForecastsContext) => {
    //     log.info("Heard 'whoami'");
    //     if (ctx.player) {
    //         ctx.reply(ctx.player.displayName);
    //     } else {
    //         ctx.reply(`I don't know`);
    //     }
    // });

    // bot.command('nextfixture', async (ctx: ForecastsContext) => {
    //     log.info("Heard 'nextfixture'");
    //     const nextFixtures: RoundDate = await operations.GetNextFixture();
    //     const formattedDate = format(nextFixtures.date, 'ddd Do MMM');
    //     ctx.reply(`Next matches: ${formattedDate} (${nextFixtures.roundName})`);
    // });

    // bot.command('mynextfixture', async (ctx: ForecastsContext) => {
    //     log.info("Heard 'mynextfixture'");
    //     if (ctx.player) {
    //         const nextFixtures: PlayerFixtureDate =
    //             await operations.GetMyNextFixture(ctx.player.playerId);
    //         const homeOrAway = nextFixtures.awayTeam ? 'H' : 'A';
    //         const formattedDate = format(nextFixtures.date, 'ddd Do MMM');
    //         const opponent = nextFixtures.homeTeam
    //             ? nextFixtures.homeTeam
    //             : nextFixtures.awayTeam;
    //         ctx.reply(
    //             `Next match: (${homeOrAway}) ${formattedDate} (${nextFixtures.roundName}) v ${opponent}`
    //         );
    //     } else {
    //         ctx.reply('Who are you? Who are you?');
    //     }
    // });

    // return bot;
};
