const Redis = require("ioredis");
const { redisConfig: { host, port, password, db } } = require("../configs/config");

const redisClient = new Redis({ host, port, password, db });

redisClient.on("connect", () => console.log("Redis Connected"));
redisClient.on("ready", () => console.log("Redis Ready"));
redisClient.on("error", () => console.log("Redis Error"));
redisClient.on("end", () => console.log("Redis Connection Closed"));
redisClient.on("reconnecting", () => console.log("Redis Reconnecting ..."));

module.exports = redisClient;