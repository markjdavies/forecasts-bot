import { ForecastsContext } from '../ForecastsContext';
import { NextFunction } from 'grammy';

export const authenticateFromChatId = async (
    ctx: ForecastsContext,
    next: NextFunction
) => {
    const log = ctx.log;
    const operations = ctx.dataOperations;
    const chatId = ctx.message.chat.id;
    const player = await operations.GetPlayerFromChatId(chatId);
    if (player) {
        log.info(`Recognised ${player.displayName}`);
        ctx.player = player;
    } else {
        log.info('Did not recognise player from chatId');
    }
    await next();
};
