import { DataOperations } from '../src/dal/DataOperations';
import { Player } from '../src/dataModel/Player';
import { validInvitationId } from './fixtures/Fixtures';
import { basicPlayer } from './fixtures/PlayerFixtures';

export class MockOperations implements DataOperations {
    public async GetPlayerFromInvitationId(
        invitationGuid: string
    ): Promise<Player> {
        if (invitationGuid === validInvitationId) {
            return basicPlayer;
        } else {
            return null;
        }
    }
}
