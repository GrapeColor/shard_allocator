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
      () => postStatus(shard, POST_STATUS_ENDPOINT, POST_STATUS_TOKEN).catch(console.error),
      POST_STATUS_INTERVAL,
    );
  }

  async function postStatus(shard: Shard, url: string, token: string): Promise<void> {
    const payload = await generatePayload(shard);
    if (!payload) return;

    const response = await axios({
      method : 'POST',
      url    : url,
      headers: { 'Authorization': `Bearer ${token}` },
      data   : payload,
    });

    await shard.send(response);
  }

  async function generatePayload(shard: Shard): Promise<PostingPayload | null> {
    const shardCount = (await shard.eval(client => client.options.shardCount)) as unknown as number | undefined;
    const shardId    = shard.id;
    const wsStatus   = (await shard.eval(client => client.ws.status)) as unknown as number;
    const guildCount = (await shard.eval(client => client.guilds.cache.size)) as unknown as number;
    const userCount  = (await shard.eval(client => countUser(client))) as unknown as number;

    if (!shardCount) return null;

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
