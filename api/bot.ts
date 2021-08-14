import { settings } from '../src/dependencies';
import { authenticateFromChatId } from '../src/middleware/authenticateFromChatId';
import { authenticateFromInvitation } from '../src/middleware/authenticateFromInvitation';
import { forecastsBot } from '../src/forecastsBot';

const mw = [
    authenticateFromInvitation(settings),
    authenticateFromChatId(settings),
];

const bot = forecastsBot(settings, mw);

export default bot;
