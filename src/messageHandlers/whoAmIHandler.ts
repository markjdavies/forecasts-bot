import { MessageHandler } from './MessageHandler';

export const whoAmIHandler: MessageHandler = async (ctx) => {
    ctx.log.info("Heard 'whoAmI'");
    if (ctx.player) {
        await ctx.reply(ctx.player.displayName);
    } else {
        await ctx.reply(`🤷`);
    }
};
