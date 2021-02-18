'use strict';

const superagent = require('superagent');
const env = getmodule('config/env')

module.exports = (bot) => {
    bot.command('dolar',  (ctx) => {
        ctx.reply('Conectando con mis contactos oscuros..')
        superagent
            .get(env.exchangeService.url)
            .then(function (res){
                const usdRate = res.body.rates.USD;
                const sellPrice = usdRate.sell;
                const buyPrice = usdRate.buy;
                ctx.reply('Precio de Venta: ' + sellPrice)
                ctx.reply('Precio de Compra: ' + buyPrice)
            })
            .catch(function(err){
                ctx.reply('Hubo un error con mis contactos :(')
            });
    })
}