import { VercelRequest, VercelResponse } from '@vercel/node';
import { settings } from '../src/dependencies';
import { forecastsBot } from '../src/forecastsBot';
import { configureContext } from '../src/middleware/configureContext';
import { authenticateFromChatId } from '../src/middleware/authenticateFromChatId';
import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { webhookCallback } from 'grammy';

const bot = forecastsBot(settings.tokenId);

bot.use(configureContext);
bot.use(authenticateFromChatId);
bot.use(authenticateFromInvitation);

export default (req: VercelRequest, res: VercelResponse) => {
    webhookCallback(bot, 'https')(req, res);
};
