import { Bot } from 'grammy';
import { ForecastsContext } from './ForecastsContext';
import { RoundDate } from './dataModel/RoundDate';
import { format } from 'fecha';
import { PlayerFixtureDate } from './dataModel/PlayerFixtureDate';

export const forecastsBot = (token: string): Bot => {
    const bot = new Bot<ForecastsContext>(token);
    bot.command('good', async (ctx) => {
        await ctx.reply('Good, good, good!');
    });
    return bot;
};

// type MessageHandler = () => Promise<string>;
// type MessageRouter = (
//     ctx: ForecastsContext,
//     update: TelegramBot.Update
// ) => MessageHandler;

// const messageHandlerMapper = (log: Logger): MessageRouter => {
//     return (ctx, update): MessageHandler => {
//         const start = (): Promise<string> => {
//             log.debug('Bot started');
//             if (ctx.player) {
//                 return Promise.resolve(`Evening, ${ctx.player.displayName}.`);
//             } else {
//                 return Promise.resolve('Evening, chief.');
//             }
//         };

//         const good = (): Promise<string> => {
//             log.info("Heard 'good'");
//             return Promise.resolve('Good, good, good!');
//         };

//         const whoAmI = (): Promise<string> => {
//             log.info("Heard 'whoami'");
//             if (ctx.player) {
//                 return Promise.resolve(ctx.player.displayName);
//                 // ctx.reply(ctx.player.displayName);
//             } else {
//                 return Promise.resolve("I don't know");
//                 // ctx.reply(`I don't know`);
//             }
//         };

//         const nextFixture = async (): Promise<string> => {
//             log.info("Heard 'nextfixture'");
//             const nextFixtures: RoundDate =
//                 await ctx.dataOperations?.GetNextFixture();
//             const formattedDate = format(nextFixtures.date, 'ddd Do MMM');
//             return `Next matches: ${formattedDate} (${nextFixtures.roundName})`;
//         };

//         const myNextFixture = async (): Promise<string> => {
//             log.info("Heard 'mynextfixture'");
//             if (ctx.player) {
//                 const nextFixtures: PlayerFixtureDate =
//                     await ctx.dataOperations?.GetMyNextFixture(
//                         ctx.player.playerId
//                     );
//                 const homeOrAway = nextFixtures.awayTeam ? 'H' : 'A';
//                 const formattedDate = format(nextFixtures.date, 'ddd Do MMM');
//                 const opponent = nextFixtures.homeTeam
//                     ? nextFixtures.homeTeam
//                     : nextFixtures.awayTeam;
//                 return `Next match: (${homeOrAway}) ${formattedDate} (${nextFixtures.roundName}) v ${opponent}`;
//             } else {
//                 return 'Who are you? Who are you?';
//             }
//         };

//         const unanticipatedRequest = (): Promise<string> => {
//             log.info('Unrecognised command.');
//             return Promise.resolve(
//                 `I hear you saying '${update?.message?.text}' to me.`
//             );
//         };

//         switch (update.message?.text) {
//             case '/start':
//                 return start;
//             case '/good':
//                 return good;
//             case '/whoami':
//                 return whoAmI;
//             case '/nextfixture':
//                 return nextFixture;
//             case '/mynextfixture':
//                 return myNextFixture;
//             default:
//                 return unanticipatedRequest;
//         }
//     };
// };

// export const forecastsBot = (
//     settings: Settings
//     // middlewares: Middleware<ForecastsContext>[]
// ): ((req: VercelRequest, _res: VercelResponse) => Promise<void>) => {
//     const { log } = settings;

//     const bot = new Bot(settings.tokenId);
//     const messageMapper = messageHandlerMapper(log);

//     return async (
//         ctx: ForecastsContext,
//         _res: VercelResponse
//     ): Promise<void> => {
//         const body: TelegramBot.Update = ctx.body;

//         if (body.message) {
//             const {
//                 chat: { id },
//             } = body.message;

//             const message = messageMapper(ctx, body)();

//             await bot.sendMessage(id, await message, {
//                 parse_mode: 'Markdown',
//             });
//         }
//     };
// };
