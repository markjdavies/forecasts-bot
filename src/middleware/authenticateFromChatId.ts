import { ForecastsContext } from '../ForecastsContext';
import { NextFunction } from 'grammy';

export const authenticateFromChatId = async (ctx: ForecastsContext, next: NextFunction) => {
    const log = ctx.log;
    const chatId = ctx.message?.chat.id;

    if (!chatId) {
        throw new Error('No chatId in context');
    }

    const player = await ctx.dataOperations?.GetPlayerFromChatId(chatId);
    if (player) {
        log.info(`Recognised ${player.displayName}`);
        ctx.player = player;
    } else {
        log.info('Did not recognise player from chatId');
    }
    await next();
};
