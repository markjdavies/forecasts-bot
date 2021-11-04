import { format } from 'fecha';
import { MessageHandler } from './MessageHandler';

export const myNextFixtureHandler: MessageHandler = async (ctx) => {
    ctx.log.info("Heard 'mynextfixture'");
    if (!ctx.dataOperations) {
        throw new Error('No data operations in context');
    }

    if (ctx.player) {
        const nextFixtures = await ctx.dataOperations?.GetMyNextFixture(ctx.player.playerId);
        const homeOrAway = nextFixtures.awayTeam ? 'H' : 'A';
        const formattedDate = format(nextFixtures.date, 'ddd Do MMM');
        const opponent = nextFixtures.homeTeam ? nextFixtures.homeTeam : nextFixtures.awayTeam;
        await ctx.reply(
            `Next match: (${homeOrAway}) ${formattedDate} (${nextFixtures.roundName}) v ${opponent}`
        );
    } else {
        await ctx.reply('Who are you? Who are you?');
    }
};
