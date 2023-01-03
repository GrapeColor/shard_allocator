#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environments_1 = require("./environments");
const log4js_1 = __importDefault(require("log4js"));
const discord_js_1 = require("discord.js");
const logName = 'Shards Allocater';
log4js_1.default.configure({
    appenders: {
        [logName]: { type: 'console' },
    },
    categories: {
        default: { appenders: [logName], level: environments_1.LOGGING_LEVEL },
    },
});
const logger = log4js_1.default.getLogger();
const manager = new discord_js_1.ShardingManager(environments_1.BOT_PATH, {
    token: environments_1.DISCORD_TOKEN,
    totalShards: environments_1.TOTAL_SHARDS,
    shardList: environments_1.SHARD_LIST,
});
manager.on('shardCreate', (shard) => {
    logger.info(`Shard ${shard.id + 1}/${manager.totalShards} spawned.`);
});
logger.info('Start spawning shards.');
manager.spawn({ timeout: 60000 })
    .then(() => logger.info('All shards were successfully spawned.'))
    .catch((error) => logger.error(error));
