import { Bot } from 'grammy';
import { ForecastsContext } from './ForecastsContext';
import {
    messageHandlerAssignator,
    MessageHandlerAssignment,
} from './messageHandlers/MessageHandler';
import { startHandler } from './messageHandlers/startHandler';
import { whoAmIHandler } from './messageHandlers/whoAmIHandler';
import { nextFixtureHandler } from './messageHandlers/nextFixtureHandler';
import { myNextFixtureHandler } from './messageHandlers/myNextFixtureHandler';
import { authenticateFromChatId } from './middleware/authenticateFromChatId';
import { authenticateFromInvitation } from './middleware/authenticateFromInvitation';
import { cupDrawHandler } from './messageHandlers/cupDrawHandler';
import { configureContext } from './middleware/configureContext';

const messageHandlers: MessageHandlerAssignment[] = [
    {
        message: 'start',
        handler: startHandler,
    },
    {
        message: 'good',
        handler: async (ctx) => {
            ctx.log.info("Heard 'good'");
            await ctx.reply('Good, good, good!');
        },
    },
    {
        message: 'whoami',
        handler: whoAmIHandler,
    },
    {
        message: 'nextfixture',
        handler: nextFixtureHandler,
    },
    {
        message: 'mynextfixture',
        handler: myNextFixtureHandler,
    },
    {
        message: 'cupdraw',
        handler: cupDrawHandler, // execute FC_I_GenerateCupFixtures
    },
];

export const forecastsBot = (token: string) => {
    const bot = new Bot<ForecastsContext>(token);

    // Apply middleware
    bot.use(configureContext);
    bot.use(authenticateFromChatId);
    bot.use(authenticateFromInvitation);

    // Apply handlers
    const assign = messageHandlerAssignator(bot);
    messageHandlers.forEach((handler) => assign(handler));

    return bot;
};
