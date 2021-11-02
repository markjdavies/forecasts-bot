import { ForecastsContext } from '~src/ForecastsContext';
import { NextFunction } from 'grammy';

export const authenticateFromInvitation = async (ctx: ForecastsContext, next: NextFunction) => {
    if (!ctx.player) {
        if (ctx.message?.text?.indexOf('/start ')) {
            const invitationGuid = ctx.message.text.replace('/start ', '');
            const player = await ctx.dataOperations?.GetPlayerFromInvitationId(invitationGuid);
            if (player) {
                await ctx.dataOperations?.SetPlayerChatId(player.playerId, ctx.message.chat.id);
                ctx.player = player;
            }
        }
    }
    await next();
};
