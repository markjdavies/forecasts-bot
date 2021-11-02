import * as pino from 'pino';
import { authenticateFromChatId } from '../src/middleware/authenticateFromChatId';
import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { forecastsBot, handleStart, startHandler } from '../src/forecastsBot';
import { MockOperations } from '../test/MockOperations';
import { validInvitationId, playerOneChatId, playerTwoChatId } from '../test/fixtures/Fixtures';
import { basicPlayer1 } from '../test/fixtures/PlayerFixtures';
import { ForecastsContext } from '../src/ForecastsContext';
import { MockForecastsContext } from './__mocks__/MockContext';
import { Context } from '../../../.config/Code/User/globalStorage/buenon.scratchpads/scratchpads/1e60904eb591042d871bc5819ce42992/scratch.';
import { Bot } from 'grammy';

const log = pino.pino({
    name: 'forecasts-bot-tests',
    level: 'error',
});

// const port = 3000;
// const secretPath = 'secret-path';

const settings = {
    tokenId: 'ABCD:1234567890',
    dataOperations: new MockOperations(),
    log,
};

// const mw = [authenticateFromInvitation(settings), authenticateFromChatId(settings)];

// const bot = forecastsBot(settings, mw);

// bot.startWebhook(`/${secretPath}`, null, port);

// const client = new TelegrafTest({
//     url: `http://127.0.0.1:${port}/${secretPath}`,
// });

// const sendCommand = async (text: string, chatId: number = 1) => {
//     client.setChat({ id: chatId, type: 'private' });
//     const length = text.split(' ')[0].length;
//     return await client.sendMessageWithText(text, {
//         entities: [
//             {
//                 offset: 0,
//                 length,
//                 type: 'bot_command',
//             },
//         ],
//     });
// };

// test('it is alive', async (t) => {
//     const r = await sendCommand('/good');
//     t.is(r.data.text, 'Good, good, good!');
// });

jest.mock('ForecastsContext');
// const defaultCtx = {
//     update: { message: { text: '', entities: [{ type: 'url' }] } },
// } as Context;
let ctx: ForecastsContext;
let bot: Bot<ForecastsContext>;

describe('Forecasts bot', () => {
    beforeEach(() => {
        bot = new Bot<ForecastsContext>(settings.tokenId);
        ctx = {
            dataOperations: new MockOperations(),
            log,
        } as ForecastsContext;
    });

    test('should acknowledge an anonymous user', () => {
        ctx.message.text = '/start';
        startHandler()(ctx);
        ctx.reply.mock;
        expect(result.data.text).toBe(`Evening, chief.`);
    });

    test('should disregard an unrecognised invitation', async () => {
        const result = await sendCommand(`/start 49b9f2b7-4c79-4523-b0f9-6ba22b5fca8d`);
        expect(result.data.text).toBe(`Evening, chief.`);
    });

    test('should recognise an invited player', async () => {
        const result = await sendCommand(`/start ${validInvitationId}`);
        expect(result.data.text).toBe(`Evening, ${basicPlayer1.displayName}.`);
    });

    test('should recognise a registered player', async () => {
        const result = await sendCommand('/whoami', playerOneChatId);
        expect(result.data.text).toBe('Player 1');
    });

    test('should regard an unregistered player as anonymous', async () => {
        const result = await sendCommand('/whoami');
        expect(result.data.text).toBe(`I don't know`);
    });

    test('should provide next round date on nextfixture command', async () => {
        const result = await sendCommand('/nextfixture');
        expect(result.data.text).toBe('Next matches: Tue 14th Jan (Cup Quarter Finals)');
    });

    test(`should provide player's next round date on mynextfixture command - home fixture`, async () => {
        const result = await sendCommand('/mynextfixture', playerOneChatId);
        expect(result.data.text).toBe(
            'Next match: (H) Sat 25th Jan (Cup Semi Finals) v The Treasury All Stars'
        );
    });

    test('should provide players next round date on mynextfixture command - away fixture', async () => {
        const result = await sendCommand('/mynextfixture', playerTwoChatId);
        expect(result.data.text).toBe('Next match: (A) Sat 1st Feb (League Game 25) v Epic Tom');
    });

    test('should handle anonymous player on mynextfixture command', async () => {
        const result = await sendCommand('/mynextfixture');
        expect(result.data.text).toBe('Who are you? Who are you?');
    });
});
