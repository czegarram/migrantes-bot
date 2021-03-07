'use strict';

const { Scenes } = require('telegraf')

module.exports = () => {
    return new Scenes.WizardScene('edit-summary-wizard',
        async (ctx) => {
            await ctx.reply('¿Cuál será el nuevo resumen, migrante?')
            return ctx.wizard.next()
        },
        async (ctx) => {
            console.log(ctx.update.message.text);
            return ctx.scene.leave();
        }
    )
}

