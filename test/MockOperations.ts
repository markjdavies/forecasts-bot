import { DataOperations } from '../src/dal/DataOperations';
import { Player } from '../src/dataModel/Player';
import { validInvitationId, roundDate } from './fixtures/Fixtures';
import { basicPlayer } from './fixtures/PlayerFixtures';
import { RoundDate } from '~src/dataModel/RoundDate';

export class MockOperations implements DataOperations {
    public async GetNextFixture(): Promise<RoundDate> {
        return roundDate;
    }
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
