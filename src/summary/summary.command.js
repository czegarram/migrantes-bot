'use strict';

module.exports = (bot, db) => {
    bot.command('resumen',  async (ctx) => {
        const ref = db.ref('/messages/summary');
        const summaryText = await ref.once('value');
        ctx.reply(summaryText)
    })
}