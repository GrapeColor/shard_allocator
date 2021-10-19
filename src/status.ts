import type { Client, Shard } from 'discord.js';

import { POST_STATUS_ENDPOINT, POST_STATUS_INTERVAL, POST_STATUS_TOKEN } from './environments';
import axios from 'axios';

export namespace Status {
  interface PostingPayload {
    shardCount: number;
    shardId   : number;
    wsStatus  : number;
    guildCount: number;
    userCount : number;
  }

  export function initialize(shard: Shard): void {
    if (!POST_STATUS_ENDPOINT || !POST_STATUS_TOKEN || !POST_STATUS_INTERVAL) return;

    setInterval(
      () => postStatus(shard, POST_STATUS_ENDPOINT, POST_STATUS_TOKEN),
      POST_STATUS_INTERVAL,
    );
  }

  function postStatus(shard: Shard, url: string, token: string): void {
    axios({
      method: 'POST',
      url: url,
      headers: { 'Authorization': `Bearer ${token}` },
      data: generatePayload(shard),
    })
      .then(response => shard.send(response))
      .catch(console.error);
  }

  async function generatePayload(shard: Shard): Promise<PostingPayload | null> {
    const shardCount = (await shard.eval(client => client.options.shardCount)) as unknown as number | undefined;
    const shardId    = shard.id;
    const wsStatus   = (await shard.eval(client => client.ws.status)) as unknown as number | undefined;
    const guildCount = (await shard.eval(client => client.guilds.cache.size)) as unknown as number | undefined;
    const userCount  = (await shard.eval(client => countUser(client))) as unknown as number | undefined;

    if (!shardCount || !wsStatus || !guildCount || !userCount) return null;

    return {
      shardCount,
      shardId,
      wsStatus,
      guildCount,
      userCount,
    };
  }

  function countUser(client: Client): number {
    return client.guilds.cache
      .reduce((count, guild) => count += guild.memberCount - 1, 0);
  }
}
