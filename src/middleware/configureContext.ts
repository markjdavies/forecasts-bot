import { VercelResponse } from '@vercel/node';
import { ForecastsContext } from '~src/ForecastsContext';
import { Settings } from '~src/Settings';

export const configureContext = (
    settings: Settings
): ((
    ctx: ForecastsContext,
    res: VercelResponse,
    next: Function
) => Promise<void>) => {
    const mw = async (
        ctx: ForecastsContext,
        _res: VercelResponse,
        next: Function
    ): Promise<void> => {
        ctx.log = settings.log;
        ctx.dataOperations = settings.dataOperations;
        await next();
    };
    return mw;
};
