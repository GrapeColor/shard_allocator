"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const environments_1 = require("./environments");
const axios_1 = __importDefault(require("axios"));
var Status;
(function (Status) {
    function initialize(shard) {
        if (!environments_1.POST_STATUS_ENDPOINT || !environments_1.POST_STATUS_TOKEN || !environments_1.POST_STATUS_INTERVAL)
            return;
        setInterval(() => postStatus(shard, environments_1.POST_STATUS_ENDPOINT, environments_1.POST_STATUS_TOKEN).catch(console.error), environments_1.POST_STATUS_INTERVAL);
    }
    Status.initialize = initialize;
    async function postStatus(shard, url, token) {
        const payload = await generatePayload(shard);
        if (!payload)
            return;
        const response = await (0, axios_1.default)({
            method: 'POST',
            url: url,
            headers: { 'Authorization': `Bearer ${token}` },
            data: payload,
        });
        await shard.send(response);
    }
    async function generatePayload(shard) {
        const shardCount = await shard.eval(client => client.options.shardCount);
        const shardId = shard.id;
        const wsStatus = await shard.eval(client => client.ws.status);
        const guildCount = await shard.eval(client => client.guilds.cache.size);
        const userCount = await shard.eval(client => countUser(client));
        if (!shardCount || !wsStatus || !guildCount || !userCount)
            return null;
        return {
            shardCount,
            shardId,
            wsStatus,
            guildCount,
            userCount,
        };
    }
    function countUser(client) {
        return client.guilds.cache
            .reduce((count, guild) => count += guild.memberCount - 1, 0);
    }
})(Status = exports.Status || (exports.Status = {}));
