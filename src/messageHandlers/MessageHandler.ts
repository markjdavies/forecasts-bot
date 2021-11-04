import { Bot } from 'grammy';
import { ForecastsContext } from '~src/ForecastsContext';

export type MessageHandler = (ctx: ForecastsContext) => Promise<void>;
export type MessageHandlerAssignment = {
    message: string;
    handler: MessageHandler;
};

export const messageHandlerAssignator = (bot: Bot<ForecastsContext>) => {
    return (assignment: MessageHandlerAssignment) => {
        bot.command(assignment.message, assignment.handler);
    };
};
