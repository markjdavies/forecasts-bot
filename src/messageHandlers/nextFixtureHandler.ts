import { format } from 'fecha';
import { MessageHandler } from './MessageHandler';

export const nextFixtureHandler: MessageHandler = async (ctx) => {
    ctx.log.info("Heard 'nextfixture'");
    if (!ctx.dataOperations) {
        throw new Error('No data operations in context');
    }
    const nextFixtures = await ctx.dataOperations.GetNextFixture();
    const formattedDate = format(nextFixtures.date, 'ddd Do MMM');
    await ctx.reply(`Next matches: ${formattedDate} (${nextFixtures.roundName})`);
};
