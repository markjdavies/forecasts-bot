import * as expect from 'expect.js';
import * as TelegrafTest from 'telegraf-test';
import { Settings } from '../src/Settings';
import AuthenticateFromInvitation from '../src/middleware/AuthenticateFromInvitation';
import ForecastsBot from '../src/ForecastsBot';

const port = 3000;
const secretPath = 'secret-path';

const settings: Settings = {
    tokenId: 'ABCD:1234567890',
    dataOperations: null
};

const mw = AuthenticateFromInvitation(settings);

const bot = ForecastsBot(settings);

bot.use(mw);

bot.hears(/ping/i, ctx => {
    ctx.reply('Pong!');
});

bot.startWebhook(`/${secretPath}`, null, port);

const test = new TelegrafTest({
    url: `http://127.0.0.1:${port}/${secretPath}`
});

describe('forecasts-bot', () => {
    it('/ping', async () => {
        const r = await test.sendMessageWithText('/ping');
        expect(r.data.text).to.be.a('string');
        expect(r.data.text).to.contain('Pong!');
    });
});
