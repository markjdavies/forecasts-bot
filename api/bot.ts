import { VercelRequest, VercelResponse } from '@vercel/node';
import { chain } from '@amaurym/now-middleware';
import { settings } from '../src/dependencies';
import { authenticateFromChatId } from '../src/middleware/authenticateFromChatId';
import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { forecastsBot } from '../src/forecastsBot';

const handler = async (_req: VercelRequest, res: VercelResponse) => {
    res.status(200).send('Bot request handled.');
};

const mw = [
    authenticateFromInvitation(settings),
    authenticateFromChatId(settings),
];

const bot = forecastsBot(settings, mw);

export default chain(bot)(handler);
