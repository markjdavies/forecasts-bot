// eslint-disable-next-line
import TelegramBot = require('node-telegram-bot-api');
import { Logger } from 'pino';
import { Settings } from './Settings';
import { VercelRequest, VercelResponse } from '@vercel/node';
// import { RoundDate } from './dataModel/RoundDate';
// import { format } from 'fecha';
// import { PlayerFixtureDate } from './dataModel/PlayerFixtureDate';

type MessageHandler = () => string;
type MessageRouter = (update: TelegramBot.Update) => MessageHandler;

const messageHandlerMapper = (log: Logger): MessageRouter => {
    return (update: TelegramBot.Update): MessageHandler => {
        const start = (): string => {
            log.debug('Bot started');
            return 'Evening, chief.';
        };

        const good = (): string => {
            log.info("Heard 'good'");
            return 'Good, good, good!';
        };

        const whoAmI = (): string => {
            log.info("Heard 'whoami'");
            return "I don't know";
        };

        const unanticipatedRequest = (): string => {
            log.info('Unrecognised command.');
            return `I hear you saying '${update?.message?.text}' to me.`;
        };

        switch (update.message?.text) {
            case '/start':
                return start;
            case '/good':
                return good;
            case '/whoami':
                return whoAmI;
            default:
                return unanticipatedRequest;
        }
    };
};

export const forecastsBot = (
    settings: Settings
    // middlewares: Middleware<ForecastsContext>[]
): ((req: VercelRequest, _res: VercelResponse) => Promise<void>) => {
    const { log } = settings;

    const bot = new TelegramBot(settings.tokenId);
    const messageMapper = messageHandlerMapper(log);

    return async (req: VercelRequest, _res: VercelResponse): Promise<void> => {
        const body: TelegramBot.Update = req.body;

        if (body.message) {
            const {
                chat: { id },
            } = body.message;

            const message = messageMapper(body)();

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
