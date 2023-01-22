#!/usr/bin/env node

import { BOT_PATH, DISCORD_TOKEN, LOGGING_LEVEL, SHARD_LIST, TOTAL_SHARDS } from './environments';
import log4js from 'log4js';
import { ShardingManager } from 'discord.js';

const logName = 'Shards Allocater';

log4js.configure({
  appenders: {
    [logName]: { type: 'console' },
  },
  categories: {
    default: { appenders: [logName], level: LOGGING_LEVEL },
  },
});

const logger = log4js.getLogger(logName);

const manager = new ShardingManager(
  BOT_PATH,
  {
    token: DISCORD_TOKEN,
    totalShards: TOTAL_SHARDS,
    shardList: SHARD_LIST,
  },
);

manager.on('shardCreate', (shard) => {
  logger.info(`Shard ${shard.id + 1}/${manager.totalShards} spawned.`);
});

logger.info('Start spawning shards.');

manager.spawn({ timeout: 60_000 })
  .then(() => logger.info('All shards were successfully spawned.'))
  .catch((error) => logger.error(error));
