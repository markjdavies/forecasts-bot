import { VercelRequest, VercelResponse } from '@vercel/node';
import { chain } from '@amaurym/now-middleware';
import { log, settings } from '../src/dependencies';
import { authenticateFromChatId } from '../src/middleware/authenticateFromChatId';
import { configureContext } from '../src/middleware/configureContext';
import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { forecastsBot } from '../src/forecastsBot';
import { webhookCallback } from 'grammy';
import pino from 'pino';
import { DataOperations } from '../src/dal/DataOperations';

const bot = forecastsBot(settings.tokenId);

bot.use(configureContext(settings));
bot.use(authenticateFromChatId);
bot.use(authenticateFromInvitation);

const handler = async (
    req: VercelRequest,
    res: VercelResponse
): Promise<void> => {
    webhookCallback(bot, 'https')(req, res);
    try {
        await bot(req, res);
    } catch (err) {
        log.error(err, 'Error in webhook');
    }
    res.send('Bot request handled.');
};

export default chain(
    configureContext(settings),
    authenticateFromChatId(settings),
    authenticateFromInvitation(settings)
)(handler);
