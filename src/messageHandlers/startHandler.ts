import { MessageHandler } from './MessageHandler';

export const startHandler: MessageHandler = async (ctx) => {
    ctx.log.debug('Bot started');
    if (ctx.player) {
        await ctx.reply(`Evening, ${ctx.player.displayName}.`);
    } else {
        await ctx.reply('Evening, chief.');
    }
};
