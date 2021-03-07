'use strict';
require( 'getmodule' )
require('dotenv').config()

const { Telegraf, Scenes, session } = require('telegraf')
const path = require('path')
const env = require('./config/env')
const config = require('./config/config')

const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: env.firebase.databaseUrl
});
const db = admin.database();

const bot = new Telegraf(env.bot.token)
bot.use(session());

let stages = [];

config.getGlobbedFiles([ './src/**/*wizard.js'])
    .forEach((listenerPath) => {
            stages.push( require(path.resolve(listenerPath))(db));
        }
    );

const stage = new Scenes.Stage(stages)
bot.use(stage.middleware())

// Registering all telegram commands and actions
config.getGlobbedFiles(['./src/**/*command.js'])
    .forEach((listenerPath) => {
            require(path.resolve(listenerPath))(bot, db);
        }
    );

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
