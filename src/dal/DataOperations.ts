import { Player } from '~src/dataModel/Player';

export interface DataOperations {
    GetPlayerFromInvitationId(invitationGuid: string): Promise<Player>;
}
