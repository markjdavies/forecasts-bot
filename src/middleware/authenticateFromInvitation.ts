import { ForecastsContext } from '../ForecastsContext';
import { NextFunction } from 'grammy';

export const authenticateFromInvitation = async (ctx: ForecastsContext, next: NextFunction) => {
    if (!ctx.player) {
        if (ctx.message?.text && ctx.message.text.indexOf('/start ') >= 0) {
            const invitationGuid = ctx.message.text.replace('/start ', '');
            const player = await ctx.dataOperations?.GetPlayerFromInvitationId(invitationGuid);
            if (player) {
                await ctx.dataOperations?.SetPlayerChatId(player.playerId, ctx.message.chat.id);
                ctx.player = player;
            } else {
                ctx.log.warn({ invitationGuid }, 'Could not identify player from invitationGuid');
            }
        }
    }
    await next();
};
