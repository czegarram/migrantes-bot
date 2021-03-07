'use strict';

module.exports = (bot) => {
    bot.hears(/^Botcito.*actualiza resumen.*/, async (ctx) => {
        ctx.scene.enter('edit-summary-wizard')
    })
}
