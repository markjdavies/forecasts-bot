import { Player } from '~src/dataModel/Player';
import { RoundDate } from '~src/dataModel/RoundDate';

export interface DataOperations {
    GetPlayerFromInvitationId(invitationGuid: string): Promise<Player>;
    GetNextFixture(): Promise<RoundDate>;
}
