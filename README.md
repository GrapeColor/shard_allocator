# Shards Supplier
This is a tool for sharding bots made with [discord.js](https://github.com/discordjs/discord.js).  

## How to use
Specify the bot's relative path and token on the command line.  

```sh
npx sharding YOUR_BOT_PATH YOUR_BOT_TOKEN
```

## Environments
### DISCORD_TOKEN
Discord bot token.  
When you specify this, you do not need to specify a token in the command.  

### BOT_TOTAL_SHARDS
The number of bot shards.  
When not specified, it will be assigned automatically.  

### BOT_SHARD_LIST
The shard number assigned to the bot.  
Please specify by separating with `,`.  
When not specified, it will be assigned automatically.  

### POST_STATUS_ENDPOINT
Specify the endpoint to post the status for each shard.  
Read the code for more information.  

### POST_STATUS_TOKEN
Specify the bearer token when posting the status to the endpoint.  
Read the code for more information.  

### POST_STATUS_INTERVAL
Specify the interval for posting status in milliseconds.  
Read the code for more information.  
