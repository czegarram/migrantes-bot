'use strict';

module.exports = {
    bot: {
        token: process.env.BOT_TOKEN || ''
    },
    exchangeService: {
        url: 'https://cotizaciones-brou.herokuapp.com/api/currency/latest'
    }
};