import { Player } from '../dataModel/Player';
import { RoundDate } from '../dataModel/RoundDate';
import { PlayerFixtureDate } from '../dataModel/PlayerFixtureDate';

export interface DataOperations {
    GetPlayerFromInvitationId(invitationGuid: string): Promise<Player>;
    GetPlayerFromChatId(chatId: number): Promise<Player | undefined>;
    GetNextFixture(): Promise<RoundDate>;
    GetMyNextFixture(playerId: number): Promise<PlayerFixtureDate>;
    SetPlayerChatId(playerId: number, chatId: number): Promise<void>;
}
