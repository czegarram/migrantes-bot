const { Telegraf } = require('telegraf')
const superagent = require('superagent')
const serviceUrl = 'https://cotizaciones-brou.herokuapp.com/api/currency/latest'

require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Bienvenido Migrante!'))
bot.help((ctx) => ctx.reply('Hola! Mi nombre es Ralph.'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hola', (ctx) => ctx.reply('Hola causita!'))
bot.command('dolar',  (ctx) => {
    ctx.reply('Conectando con mis contactos oscuros..')
    superagent
        .get(serviceUrl)
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

bot.command('resumen',  (ctx) => {
    ctx.reply('Viernes 12 (desde 18:00) Degustación Hamburguesas at Causa house')
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
