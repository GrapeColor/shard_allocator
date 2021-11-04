export const BOT_PATH = process.argv[2] ?? process.env['BOT_PATH'] ?? '';

export const DISCORD_TOKEN = process.argv[3] ?? process.env['DISCORD_TOKEN'] ?? '';
export const BOT_TOTAL_SHARDS = Number(process.env['BOT_TOTAL_SHARDS']) || 'auto';
export const BOT_SHARD_LIST = process.env['BOT_SHARD_LIST']?.split(',').map(Number) ?? 'auto';

export const POST_STATUS_ENDPOINT = process.env['POST_STATUS_ENDPOINT'] ?? '';
export const POST_STATUS_TOKEN = process.env['POST_STATUS_TOKEN'] ?? '';
export const POST_STATUS_INTERVAL = Number(process.env['POST_STATUS_INTERVAL']);
