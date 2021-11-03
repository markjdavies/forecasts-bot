import { mockDeep, mockReset } from 'jest-mock-extended';
import * as pino from 'pino';
// import { authenticateFromChatId } from '../src/middleware/authenticateFromChatId';
// import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { startHandler } from '../src/forecastsBot';
import { MockOperations } from './__mocks__/MockOperations';
// import { validInvitationId, playerOneChatId, playerTwoChatId } from '../test/fixtures/Fixtures';
// import { basicPlayer1 } from '../test/fixtures/PlayerFixtures';
import { ForecastsContext } from '../src/ForecastsContext';

const log = pino.pino({
    name: 'forecasts-bot-tests',
    level: 'error',
});

const ctx: ForecastsContext = {
    ...mockDeep<ForecastsContext>(),
    log,
    dataOperations: new MockOperations(),
    message: {
        message_id: 1111,
        date: Date.now(),
        chat: {
            type: 'private',
            id: 2222,
            first_name: 'Jest',
        },
    },
    reply: jest.fn(),
};

describe('Forecasts bot', () => {
    beforeEach(() => {
        mockReset(ctx);
    });

    test('should acknowledge an anonymous user', () => {
        ctx!.message!.text = '/start';
        startHandler(ctx);
        expect(ctx.reply).toHaveBeenCalledWith('Evening, chief.');
    });

    // test('should disregard an unrecognised invitation', async () => {
    //     const result = await sendCommand(`/start 49b9f2b7-4c79-4523-b0f9-6ba22b5fca8d`);
    //     expect(result.data.text).toBe(`Evening, chief.`);
    // });

    // test('should recognise an invited player', async () => {
    //     const result = await sendCommand(`/start ${validInvitationId}`);
    //     expect(result.data.text).toBe(`Evening, ${basicPlayer1.displayName}.`);
    // });

    // test('should recognise a registered player', async () => {
    //     const result = await sendCommand('/whoami', playerOneChatId);
    //     expect(result.data.text).toBe('Player 1');
    // });

    // test('should regard an unregistered player as anonymous', async () => {
    //     const result = await sendCommand('/whoami');
    //     expect(result.data.text).toBe(`I don't know`);
    // });

    // test('should provide next round date on nextfixture command', async () => {
    //     const result = await sendCommand('/nextfixture');
    //     expect(result.data.text).toBe('Next matches: Tue 14th Jan (Cup Quarter Finals)');
    // });

    // test(`should provide player's next round date on mynextfixture command - home fixture`, async () => {
    //     const result = await sendCommand('/mynextfixture', playerOneChatId);
    //     expect(result.data.text).toBe(
    //         'Next match: (H) Sat 25th Jan (Cup Semi Finals) v The Treasury All Stars'
    //     );
    // });

    // test('should provide players next round date on mynextfixture command - away fixture', async () => {
    //     const result = await sendCommand('/mynextfixture', playerTwoChatId);
    //     expect(result.data.text).toBe('Next match: (A) Sat 1st Feb (League Game 25) v Epic Tom');
    // });

    // test('should handle anonymous player on mynextfixture command', async () => {
    //     const result = await sendCommand('/mynextfixture');
    //     expect(result.data.text).toBe('Who are you? Who are you?');
    // });
});
