'use strict';

const { Scenes } = require('telegraf')

module.exports = (db) => {
    return new Scenes.WizardScene('edit-summary-wizard',
        async (ctx) => {
            await ctx.reply('¿Cuál será el nuevo resumen, migrante?')
            return ctx.wizard.next()
        },
        async (ctx) => {
            const ref = db.ref("/messages");
            await ref.update({
                summary: ctx.update.message.text
            });
            await ctx.reply('Listo, migrante!')
            return ctx.scene.leave();
        }
    )
}

