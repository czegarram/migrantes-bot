'use strict';
require( 'getmodule' )
require('dotenv').config()

const { Telegraf } = require('telegraf')
const path = require('path')
const env = require('./config/env')
const config = require('./config/config')

const bot = new Telegraf(env.bot.token)

// Registering all telegram commands and actions
config.getGlobbedFiles('./src/**/*command.js')
    .forEach((listenerPath) => {
            require(path.resolve(listenerPath))(bot);
        }
    );

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
