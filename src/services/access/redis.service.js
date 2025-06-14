const redisClient = require("../../redis/redisClient.util");

const updateRedis = async (userId, sessionId, refreshToken, ttlSeconds) => {
    const redisKey = `session:${userId}:${sessionId}`;
    await redisClient.set(redisKey, refreshToken, { EX: ttlSeconds });             // 7 days
}

const addOldRefreshTokenToBlacklist = async (userId, refreshToken, ttlSeconds) => {
    await redisClient.sadd(`usedRefreshToken:${userId}`, refreshToken);
    await redisClient.expire(`usedRefreshToken:${userId}`, ttlSeconds);
}

const isTokenMatch = async (userId, sessionId, oldRefreshToken) => {
    const redisKey = `session:${userId}:${sessionId}`;
    const savedToken = await redisClient.get(redisKey);
    if (!savedToken || savedToken !== oldRefreshToken) {
        if (savedToken) {
            console.warn("Token missmatch, potential token reuse")
        }
        throw new BadRequestError("Invalid token");
    }
}

const isTokenReused = async (userId, sessionId, oldRefreshToken) => {
    const isReused = await redisClient.sismember(`usedRefreshToken:${userId}`, oldRefreshToken);
    if (isReused) {
        const redisKey = `session:${userId}:${sessionId}`;
        await redisClient.del(redisKey);
        const allUserSessionKeys = await redisClient.keys(`session:${userId}:*`);
        if (allUserSessionKeys.length > 0) {
            await redisClient.del(...allUserSessionKeys);
            console.error(`CRITICAL: All ssession for userId: ${userId} invalidated due to refresh token reused`);
        }
        throw new BadRequestError("Refresh token reused");
    }
}

const removeRefreshToken = async (userId, sessionId) => {
    const redisKey = `session:${userId}:${sessionId}`;
    const deletedCount = await redisClient.del(redisKey);
    if (deletedCount === 0) {
        console.log("already deleted session");
    }
}

const getApiKeyFromCache = async (apiKey) => {
    return await redisClient.get(`apikey:${apiKey}`);
}

const setApiKeyFromCache = async (apiKey, data, ttlSeconds) => {
    await redisClient.set(`apikey:${apiKey}`, JSON.stringify(data), { EX: ttlSeconds });
}

module.exports = {
    updateRedis,
    addOldRefreshTokenToBlacklist,
    isTokenMatch,
    isTokenReused,
    removeRefreshToken,
    getApiKeyFromCache,
    setApiKeyFromCache
}