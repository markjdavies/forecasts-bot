import * as sql from 'mssql';
import { Player, ForecastsContext } from '~src/ForecastsContext';

export default async (ctx: ForecastsContext, next: Function): Promise<void> => {
    if (ctx.message.text.indexOf('/start ') >= 0) {
        const config: sql.config = ctx.dbConfig;
        const pool = new sql.ConnectionPool(config);
        const connect = pool.connect();
        await connect;
        const request = new sql.Request();

        const invitationGuid = ctx.message.text.replace('/start ', '');
        request.input('invitationId', sql.UniqueIdentifier, invitationGuid);
        const result = await request.execute<Player>(
            'telegram.GetPlayerFromInvitationId'
        );
        ctx.player = result?.recordset?.[0];
    }
    await next();
};
