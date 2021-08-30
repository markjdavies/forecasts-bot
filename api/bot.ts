import { VercelRequest, VercelResponse } from '@vercel/node';
// import { chain } from '@amaurym/now-middleware';
import { log, settings } from '../src/dependencies';
// import { authenticateFromChatId } from '../src/middleware/authenticateFromChatId';
// import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { forecastsBot } from '../src/forecastsBot';

// const mw = [
//     authenticateFromInvitation(settings),
//     authenticateFromChatId(settings),
// ];

const bot = forecastsBot(settings);
export default async function handler(
    req: VercelRequest,
    res: VercelResponse
): Promise<void> {
    try {
        await bot(req, res);
    } catch (err) {
        log.err(err, 'Error in webhook');
    }
    res.send('Bot request handled.');
}
