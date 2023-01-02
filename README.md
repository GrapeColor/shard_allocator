# Shards Allocater
This is a tool for sharding a bot made with [discord.js](https://github.com/discordjs/discord.js).  

## How to use
Specify the bot's relative path and token on the command line.  
You can optionally specify a total shard and a shard list.  

```sh
npx sharding BOT_PATH [DISCORD_TOKEN [TOTAL_SHARDS [SHARD_LIST]]]
```

## Environments
When you specify these, you do not need to specify the values in the command.  

### DISCORD_TOKEN
Discord bot token.  

### TOTAL_SHARDS(optional)
The number of bot shards.  
When not specified, it will be assigned automatically.  

### SHARD_LIST(optional)
The shard number assigned to the bot.  
Please specify by separating with `,`.  
When not specified, it will be assigned automatically.  
