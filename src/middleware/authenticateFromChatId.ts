import { ForecastsContext } from '~src/ForecastsContext';
import { Settings } from '~src/Settings';

export const authenticateFromChatId = (
    settings: Settings
): ((ctx: ForecastsContext, next: Function) => Promise<void>) => {
    const operations = settings.dataOperations;

    const mw = async (ctx: ForecastsContext, next: Function): Promise<void> => {
        const chatId = ctx?.message?.chat?.id;
        const player = await operations.GetPlayerFromChatId(chatId);
        if (player) {
            ctx.player = player;
        }
        await next();
    };
    return mw;
};
