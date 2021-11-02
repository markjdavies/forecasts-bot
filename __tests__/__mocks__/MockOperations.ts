import { DataOperations } from '../../src/dal/DataOperations';
import { Player } from '../../src/dataModel/Player';
import {
    validInvitationId,
    roundDate,
    playerHomeFixture,
    playerAwayFixture,
    playerOneChatId,
    playerTwoChatId,
} from '../__fixtures__/Fixtures';
import { basicPlayer1, basicPlayer2 } from '../__fixtures__/PlayerFixtures';
import { RoundDate } from '../../src/dataModel/RoundDate';
import { PlayerFixtureDate } from '../../src/dataModel/PlayerFixtureDate';

export class MockOperations implements DataOperations {
    public GetNextFixture(): Promise<RoundDate> {
        return Promise.resolve(roundDate);
    }

    public GetMyNextFixture(playerId: number): Promise<PlayerFixtureDate> {
        if (playerId === playerHomeFixture.home) {
            return Promise.resolve(playerHomeFixture);
        } else if (playerId === playerAwayFixture.away) {
            return Promise.resolve(playerAwayFixture);
        } else {
            return Promise.reject();
        }
    }

    public GetPlayerFromInvitationId(invitationGuid: string): Promise<Player> {
        if (invitationGuid === validInvitationId) {
            return Promise.resolve(basicPlayer1);
        } else {
            return Promise.reject();
        }
    }

    public SetPlayerChatId(_playerId: number, _chatId: number): Promise<void> {
        return Promise.resolve();
    }

    public GetPlayerFromChatId(chatId: number): Promise<Player> {
        if (chatId === playerOneChatId) {
            return Promise.resolve(basicPlayer1);
        } else if (chatId === playerTwoChatId) {
            return Promise.resolve(basicPlayer2);
        } else {
            return Promise.reject();
        }
    }
}
