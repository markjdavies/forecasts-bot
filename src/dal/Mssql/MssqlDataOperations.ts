import { DataOperations } from '../DataOperations';
import * as sql from 'mssql';
import { Player } from '~src/dataModel/Player';

export class MssqlDataOperations implements DataOperations {
    private _connectString: string;
    constructor(
        dbUsername: string,
        dbPassword: string,
        dbHostName: string,
        databaseName: string
    ) {
        this._connectString = `mssql://${dbUsername}:${dbPassword}@${dbHostName}/${databaseName}`;
    }

    public async GetPlayerFromInvitationId(
        invitationGuid: string
    ): Promise<Player> {
        const pool = new sql.ConnectionPool(this._connectString);
        await pool.connect();
        const request = new sql.Request(pool);
        request.input('invitationId', sql.UniqueIdentifier, invitationGuid);
        const result = await request.execute<Player>(
            'telegram.GetPlayerFromInvitationId'
        );
        return result.recordsets[0][0];
    }
}
