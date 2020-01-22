import { Player } from '~src/dataModel/Player';
import { RoundDate } from '~src/dataModel/RoundDate';
import { PlayerFixtureDate } from '~src/dataModel/PlayerFixtureDate';

export interface DataOperations {
    GetPlayerFromInvitationId(invitationGuid: string): Promise<Player>;
    GetPlayerFromChatId(chatId: number): Promise<Player>;
    GetNextFixture(): Promise<RoundDate>;
    GetMyNextFixture(playerId: number): Promise<PlayerFixtureDate>;
}
