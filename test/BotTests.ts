import test from 'ava';
import * as TelegrafTest from 'telegraf-test';
import { Settings } from '../src/Settings';
import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { forecastsBot } from '../src/forecastsBot';
import { MockOperations } from './MockOperations';
import { validInvitationId } from './fixtures/Fixtures';
import { basicPlayer } from './fixtures/PlayerFixtures';

const port = 3000;
const secretPath = 'secret-path';

const settings: Settings = {
    tokenId: 'ABCD:1234567890',
    dataOperations: new MockOperations()
};


const mw = authenticateFromInvitation(settings);

const bot = forecastsBot(settings, [mw]);

bot.startWebhook(`/${secretPath}`, null, port);

const client = new TelegrafTest({
    url: `http://127.0.0.1:${port}/${secretPath}`
});

const sendCommand = async (text: string) => {
    const length = text.split(' ')[0].length;
    return await client.sendMessageWithText(text, {
        entities: [{
            offset: 0,
            length,
            type: 'bot_command'
        }]
    });
};

test('it is alive', async t => {
    const r = await sendCommand('/good');
    t.is(r.data.text, 'Good, good, good!');
});

test('should acknowledge an anonymous user', async t => {
    const result = await sendCommand(`/start`);
    t.is(result.data.text, `Evening, chief.`);
});

test('should disregard an unrecognised invitation', async t => {
    const result = await sendCommand(
        `/start 49b9f2b7-4c79-4523-b0f9-6ba22b5fca8d`
    );
    t.is(result.data.text, `Evening, chief.`);
});

test('should recognise an invited player', async t => {
    const result = await sendCommand(
        `/start ${validInvitationId}`
    );
    t.is(result.data.text, `Evening, ${basicPlayer.displayName}.`);
});

test('should provide next round date on nextFixture command', async t => {
    const result = await sendCommand('/nextfixture');
    t.is(result.data.text, 'Next matches: Tue 14th Jan (Cup Quarter Finals)');
});
