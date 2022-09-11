#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();

import { BOT_PATH, DISCORD_TOKEN, SHARD_LIST, TOTAL_SHARDS } from './environments';
import { ShardingManager } from 'discord.js';

const manager = new ShardingManager(
  BOT_PATH,
  {
    token: DISCORD_TOKEN,
    totalShards: TOTAL_SHARDS,
    shardList: SHARD_LIST,
  },
);

manager.on('shardCreate', (shard) => {
  console.info(`Shard ${shard.id + 1}/${manager.totalShards} spawned.`);
});

console.info('Start spawning shards.');

manager.spawn({ timeout: 60_000 })
  .then(() => console.info('All shards were successfully spawned.'))
  .catch(console.error);
