import { VercelResponse } from '@vercel/node';
import { ForecastsContext } from '~src/ForecastsContext';
import { Settings } from '~src/Settings';

export const authenticateFromChatId = (
    settings: Settings
): ((
    ctx: ForecastsContext,
    res: VercelResponse,
    next: Function
) => Promise<void>) => {
    const { log } = settings;
    const operations = settings.dataOperations;

    const mw = async (
        ctx: ForecastsContext,
        _res: VercelResponse,
        next: Function
    ): Promise<void> => {
        const chatId = ctx.body?.message?.chat?.id;
        const player = await operations.GetPlayerFromChatId(chatId);

        if (player) {
            log.info(`Recognised ${player.displayName}`);
            ctx.player = player;
        } else {
            log.info('Did not recognise player from chatId');
        }
        await next();
    };
    return mw;
};
