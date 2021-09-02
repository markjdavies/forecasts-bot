import { Settings } from '~src/Settings';
import { ForecastsContext } from '~src/ForecastsContext';
import { VercelResponse } from '@vercel/node';

export const authenticateFromInvitation = (
    settings: Settings
): ((
    ctx: ForecastsContext,
    res: VercelResponse,
    next: Function
) => Promise<void>) => {
    const operations = settings.dataOperations;

    const mw = async (
        ctx: ForecastsContext,
        _res: VercelResponse,
        next: Function
    ): Promise<void> => {
        if (!ctx.player) {
            if (ctx.body?.message?.text.indexOf('/start ') >= 0) {
                const invitationGuid = ctx.body?.message.text.replace(
                    '/start ',
                    ''
                );
                const player = await operations.GetPlayerFromInvitationId(
                    invitationGuid
                );
                if (player) {
                    await operations.SetPlayerChatId(
                        player.playerId,
                        ctx.body?.message?.chat?.id
                    );
                    ctx.player = player;
                }
            }
        }
        await next();
    };
    return mw;
};
