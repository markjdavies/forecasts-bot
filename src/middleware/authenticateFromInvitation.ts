import { ForecastsContext } from '~src/ForecastsContext';
import { Settings } from '~src/Settings';

export const authenticateFromInvitation = (
    settings: Settings
): ((ctx: ForecastsContext, next: Function) => Promise<void>) => {
    const operations = settings.dataOperations;

    const mw = async (ctx: ForecastsContext, next: Function): Promise<void> => {
        if (ctx.message.text.indexOf('/start ') >= 0) {
            const invitationGuid = ctx.message.text.replace('/start ', '');
            const player = await operations.GetPlayerFromInvitationId(
                invitationGuid
            );
            if (player) {
                ctx.player = player;
            }
        }
        await next();
    };
    return mw;
};
