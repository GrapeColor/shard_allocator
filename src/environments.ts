export const BOT_PATH: string = ((path?: string) => {
  if (!path) {
    throw new RangeError('The "BOT_PATH" is not specified.');
  }

  return path;
})(process.argv.at(2));

export const DISCORD_TOKEN: string = (() => {
  const token = process.argv.at(3) ?? process.env['DISCORD_TOKEN'];

  if (!token) {
    throw new RangeError('The "DISCORD_TOKEN" is not specified.');
  }

  return token;
})();

export const TOTAL_SHARDS: number | 'auto' = (
  Number(process.argv.at(4) ?? process.env['BOT_TOTAL_SHARDS']) || 'auto'
);

export const SHARD_LIST: number[] | 'auto' = (
  (process.argv.at(5) ?? process.env['BOT_SHARD_LIST'])?.split(',').map(Number) ?? 'auto'
);
