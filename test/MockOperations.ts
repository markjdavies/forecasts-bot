import { DataOperations } from '../src/dal/DataOperations';
import { Player } from '../src/dataModel/Player';
import {
    validInvitationId,
    roundDate,
    playerHomeFixture,
    playerAwayFixture,
    playerOneChatId,
    playerTwoChatId
} from './fixtures/Fixtures';
import { basicPlayer1, basicPlayer2 } from './fixtures/PlayerFixtures';
import { RoundDate } from '~src/dataModel/RoundDate';
import { PlayerFixtureDate } from '~src/dataModel/PlayerFixtureDate';

export class MockOperations implements DataOperations {
    public async GetNextFixture(): Promise<RoundDate> {
        return roundDate;
    }

    public async GetMyNextFixture(
        playerId: number
    ): Promise<PlayerFixtureDate> {
        if (playerId === playerHomeFixture.home) {
            return playerHomeFixture;
        } else if (playerId === playerAwayFixture.away) {
            return playerAwayFixture;
        } else {
            return null;
        }
    }

    public async GetPlayerFromInvitationId(
        invitationGuid: string
    ): Promise<Player> {
        if (invitationGuid === validInvitationId) {
            return basicPlayer1;
        } else {
            return null;
        }
    }

    public async SetPlayerChatId(
        _playerId: number,
        _chatId: number
    ): Promise<void> {
        return;
    }

    public async GetPlayerFromChatId(chatId: number): Promise<Player> {
        if (chatId === playerOneChatId) {
            return basicPlayer1;
        } else if (chatId === playerTwoChatId) {
            return basicPlayer2;
        } else {
            return null;
        }
    }
}
