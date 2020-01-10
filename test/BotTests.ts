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
    const r = await client.sendMessageWithText('/good');
    t.is(r.data.text, 'Good, good, good!');
});

test('should acknowledge an anonymous user', async t => {
    const result = await client.sendMessageWithText(`/start`);
    t.is(result.data.text, `Evening, chief.`);
});

test('should disregard an unrecognised invitation', async t => {
    const result = await client.sendMessageWithText(
        `/start 49b9f2b7-4c79-4523-b0f9-6ba22b5fca8d`
    );
    t.is(result.data.text, `Evening, chief.`);
});

test('should recognise an invited player', async t => {
    const result = await client.sendMessageWithText(
        `/start ${validInvitationId}`
    );
    t.is(result.data.text, `Evening, ${basicPlayer.displayName}.`);
});
