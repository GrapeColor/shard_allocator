"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHARD_LIST = exports.TOTAL_SHARDS = exports.DISCORD_TOKEN = exports.BOT_PATH = exports.LOGGING_LEVEL = void 0;
exports.LOGGING_LEVEL = process.env['LOGGING_LEVEL'] ?? 'info';
exports.BOT_PATH = ((path) => {
    if (!path) {
        throw new RangeError('The "BOT_PATH" is not specified.');
    }
    return path;
})(process.argv.at(2));
exports.DISCORD_TOKEN = (() => {
    const token = process.argv.at(3) ?? process.env['DISCORD_TOKEN'];
    if (!token) {
        throw new RangeError('The "DISCORD_TOKEN" is not specified.');
    }
    return token;
})();
exports.TOTAL_SHARDS = (Number(process.argv.at(4) ?? process.env['BOT_TOTAL_SHARDS']) || 'auto');
exports.SHARD_LIST = ((process.argv.at(5) ?? process.env['BOT_SHARD_LIST'])?.split(',').map(Number) ?? 'auto');
