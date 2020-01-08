import * as expect from 'expect.js';
import * as TelegrafTest from 'telegraf-test';
import { Settings } from '../src/Settings';
import AuthenticateFromInvitation from '../src/middleware/AuthenticateFromInvitation';
import ForecastsBot from '../src/ForecastsBot';
import { MockOperations } from './MockOperations';
import { validInvitationId } from './fixtures/Fixtures';
import { basicPlayer } from './fixtures/PlayerFixtures';

const port = 3000;
const secretPath = 'secret-path';

const settings: Settings = {
    tokenId: 'ABCD:1234567890',
    dataOperations: new MockOperations()
};

const mw = AuthenticateFromInvitation(settings);

const bot = ForecastsBot(settings, [mw]);
bot.startWebhook(`/${secretPath}`, null, port);

const client = new TelegrafTest({
    url: `http://127.0.0.1:${port}/${secretPath}`
});

describe('forecasts-bot', () => {
    it('is alive', async () => {
        const r = await client.sendMessageWithText('/ping');
        expect(r.data.text).to.be.a('string');
        expect(r.data.text).to.contain('Pong!');
    });
    describe('AuthenticateFromInvitation middleware', () => {
        it('should set the player context from invitation ID', async () => {
            const result = await client.sendMessageWithText(
                `/start ${validInvitationId}`
            );

            expect(result.data.text).to.be.a('string');
            expect(result.data.text).to.be(
                `Evening, ${basicPlayer.displayName}.`
            );
        });
    });
});
