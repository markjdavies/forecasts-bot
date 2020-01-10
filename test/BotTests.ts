import test from 'ava';
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

test('it is alive', async t => {
    const r = await client.sendMessageWithText('/ping');
    t.is(r.data.text, 'Pong!');
});

test('should recognise an invited player', async t => {
    const result = await client.sendMessageWithText(
        `/start ${validInvitationId}`
    );
    t.is(result.data.text, `Evening, ${basicPlayer.displayName}.`);
});
