import { NowRequest, NowResponse } from '@vercel/node';
import { chain } from '@amaurym/now-middleware';
import { settings } from '../src/dependencies';
import { authenticateFromChatId } from '../src/middleware/authenticateFromChatId';
import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { forecastsBot } from '../src/forecastsBot';

const handler = async (_req: NowRequest, _res: NowResponse): Promise<void> => {
    return null;
};

const mw = [
    authenticateFromInvitation(settings),
    authenticateFromChatId(settings),
];

const bot = forecastsBot(settings, mw);

export default chain(bot)(handler);
