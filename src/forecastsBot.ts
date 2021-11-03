import { Bot } from 'grammy';
import { ForecastsContext } from './ForecastsContext';
import { format } from 'fecha';

export const forecastsBot = (token: string) => {
    const bot = new Bot<ForecastsContext>(token);

    handleStart(bot);
    handleGood(bot);
    handleWhoAmI(bot);
    handleNextfixture(bot);
    handleMyNextFixture(bot);

    return bot;
};

function handleStart(bot: Bot<ForecastsContext>) {
    bot.command('start', startHandler);
}

export const startHandler = async (ctx: ForecastsContext) => {
    ctx.log.debug('Bot started');
    if (ctx.player) {
        await ctx.reply(`Evening, ${ctx.player.displayName}.`);
    } else {
        await ctx.reply('Evening, chief.');
    }
};

function handleGood(bot: Bot<ForecastsContext>) {
    bot.command('good', async (ctx) => {
        ctx.log.info("Heard 'good'");
        await ctx.reply('Good, good, good!');
    });
}

function handleWhoAmI(bot: Bot<ForecastsContext>) {
    bot.command('whoAmI', async (ctx) => {
        ctx.log.info("Heard 'whoAmI'");
        if (ctx.player) {
            await ctx.reply(ctx.player.displayName);
        } else {
            await ctx.reply(`🤷`);
        }
    });
}

function handleNextfixture(bot: Bot<ForecastsContext>) {
    bot.command('nextfixture', async (ctx) => {
        ctx.log.info("Heard 'nextfixture'");
        if (!ctx.dataOperations) {
            throw new Error('No data operations in context');
        }
        const nextFixtures = await ctx.dataOperations.GetNextFixture();
        const formattedDate = format(nextFixtures.date, 'ddd Do MMM');
        await ctx.reply(`Next matches: ${formattedDate} (${nextFixtures.roundName})`);
    });
}

function handleMyNextFixture(bot: Bot<ForecastsContext>) {
    bot.command('mynextfixture', async (ctx) => {
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
    });
}
