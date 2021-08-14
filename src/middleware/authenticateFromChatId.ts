/* eslint-disable no-console */
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
            console.info(`Recognised ${player.displayName}`);
            ctx.player = player;
        } else {
            console.info('Did not recognise player from chatId');
        }
        await next();
    };
    return mw;
};
