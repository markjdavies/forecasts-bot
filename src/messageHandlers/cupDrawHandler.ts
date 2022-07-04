import { MessageHandler } from './MessageHandler';

export const cupDrawHandler: MessageHandler = async (ctx) => {
    ctx.log.info("Heard 'cupdraw'");

    if (!ctx.dataOperations) {
        throw new Error('No data operations in context');
    }

    if (ctx.player?.userName?.toLowerCase() !== 'clam') {
        throw new Error('No authorisation to perform a cup draw');
    }

    await ctx.dataOperations.PerformCupDraw();

    await ctx.reply('Cup draw requested - check fixtures');
};
