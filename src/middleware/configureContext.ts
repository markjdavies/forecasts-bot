import { NextFunction } from 'grammy';
import { dataOperations, log } from '~src/dependencies';
import { ForecastsContext } from '../ForecastsContext';

export const configureContext = async (ctx: ForecastsContext, next: NextFunction) => {
    ctx.log = log;
    ctx.dataOperations = dataOperations;
    await next();
};
