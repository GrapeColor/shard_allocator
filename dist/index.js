#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const discord_js_1 = require("discord.js");
const environments_1 = require("./environments");
const manager = new discord_js_1.ShardingManager(environments_1.BOT_PATH, {
    token: environments_1.DISCORD_TOKEN,
    totalShards: environments_1.TOTAL_SHARDS,
    shardList: environments_1.SHARD_LIST,
});
manager.on('shardCreate', shard => {
    console.info(`Shard ${shard.id + 1}/${manager.totalShards} spawned.`);
});
console.info('Start spawning shards.');
manager.spawn({ timeout: 60000 })
    .then(() => console.info('All shards were successfully spawned.'))
    .catch(console.error);
