import { mock } from 'jest-mock-extended';
import * as pino from 'pino';
import { authenticateFromChatId } from '../src/middleware/authenticateFromChatId';
import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { MockOperations } from './__mocks__/MockOperations';
import { validInvitationId, playerOneChatId } from './__fixtures__/Fixtures';
import { basicPlayer1, basicPlayer2 } from './__fixtures__/PlayerFixtures';
import { ForecastsContext } from '../src/ForecastsContext';
import { startHandler } from '../src/messageHandlers/startHandler';
import { whoAmIHandler } from '../src/messageHandlers/whoAmIHandler';
import { nextFixtureHandler } from '../src/messageHandlers/nextFixtureHandler';
import { myNextFixtureHandler } from '../src/messageHandlers/myNextFixtureHandler';

const log = pino.pino({
    name: 'forecasts-bot-tests',
    level: 'error',
});

const makeContext = (): ForecastsContext => {
    return {
        ...mock<ForecastsContext>(),
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
};
let ctx: ForecastsContext;

describe('Forecasts bot', () => {
    beforeEach(() => {
        ctx = makeContext();
    });

    test('should acknowledge an anonymous user', () => {
        ctx!.message!.text = '/start';
        startHandler(ctx);
        expect(ctx.reply).toHaveBeenCalledWith('Evening, chief.');
    });

    test('should disregard an unrecognised invitation', async () => {
        ctx!.message!.text = '/start 49b9f2b7-4c79-4523-b0f9-6ba22b5fca8d';
        await startHandler(ctx);
        expect(ctx.reply).toHaveBeenCalledWith('Evening, chief.');
    });

    test('should recognise an invited player', async () => {
        ctx!.message!.text = `/start ${validInvitationId}`;
        await authenticateFromInvitation(ctx, async () => {
            await startHandler(ctx);
        });
        expect(ctx.reply).toHaveBeenCalledWith(`Evening, ${basicPlayer1.displayName}.`);
    });

    test('should recognise a registered player', async () => {
        ctx!.message!.text = '/whoami';
        ctx!.message!.chat!.id = playerOneChatId;
        await authenticateFromChatId(ctx, async () => {
            await whoAmIHandler(ctx);
        });
        expect(ctx.reply).toHaveBeenCalledWith('Player 1');
    });

    test('should regard an unregistered player as anonymous', async () => {
        ctx!.message!.text = '/whoami';
        await authenticateFromChatId(ctx, async () => {
            await whoAmIHandler(ctx);
        });
        expect(ctx.reply).toHaveBeenCalledWith('🤷');
    });

    test('should provide next round date on nextfixture command', async () => {
        ctx!.message!.text = '/nextfixture';
        await nextFixtureHandler(ctx);
        expect(ctx.reply).toHaveBeenCalledWith('Next matches: Tue 14th Jan (Cup Quarter Finals)');
    });

    test(`should provide player's next round date on mynextfixture command - home fixture`, async () => {
        ctx!.message!.text = '/mynextfixture';
        ctx.player = basicPlayer1;
        await myNextFixtureHandler(ctx);
        expect(ctx.reply).toHaveBeenCalledWith(
            'Next match: (H) Sat 25th Jan (Cup Semi Finals) v The Treasury All Stars'
        );
    });

    test('should provide players next round date on mynextfixture command - away fixture', async () => {
        ctx!.message!.text = '/mynextfixture';
        ctx.player = basicPlayer2;
        await myNextFixtureHandler(ctx);
        expect(ctx.reply).toHaveBeenCalledWith(
            'Next match: (A) Sat 1st Feb (League Game 25) v Epic Tom'
        );
    });

    test('should handle anonymous player on mynextfixture command', async () => {
        ctx!.message!.text = '/mynextfixture';
        await myNextFixtureHandler(ctx);
        expect(ctx.reply).toHaveBeenCalledWith('Who are you? Who are you?');
    });
});
