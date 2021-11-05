import { VercelRequest, VercelResponse } from '@vercel/node';
import { settings } from '../src/dependencies';
import { forecastsBot } from '../src/forecastsBot';
import { webhookCallback } from 'grammy';

const bot = forecastsBot(settings.tokenId);

export default (req: VercelRequest, res: VercelResponse) => {
    webhookCallback(bot, 'https')(req, res);
};
