const { ForbiddenRequestError } = require("../core/error.response");
const { getApiKeyFromCache, setApiKeyFromCache } = require("../services/access/redis.service");
const findByKey = require("../services/apikey.service");

const HEADERS = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "authorization"
}

const checkApiKey = async (req, res, next) => {
    const apiKey = req.headers[HEADERS.API_KEY]?.toString();
    if (!apiKey) {
        throw new ForbiddenRequestError("API key missing");
    }

    // check x-api-key in redis, if not found in redis find in database
    let keyHolder;
    try {
        const cachedApiKey = await getApiKeyFromCache(apiKey);
        if (cachedApiKey) {
            keyHolder = JSON.parse(cachedApiKey);
        } else {
            keyHolder = await findByKey(apiKey);
            // if find out in db, update to redis, random time to live to avoid cache stampede
            const ttlSeconds = 60 * 60 + Math.floor(Math.random() * 300);                       // 1h ± 5 phút
            if (keyHolder) {
                await setApiKeyFromCache(apiKey, keyHolder, ttlSeconds);
            }
        }
    } catch (err) {
        console.error("Redis caching error");
        // if redis error, fallback to database
        keyHolder = await findByKey(apiKey);
    }

    if (!keyHolder) {
        throw new ForbiddenRequestError("Invalid API key");
    }

    // if key exists, next
    req.apiKeyInfo = keyHolder;
    next();
}

// Middleware Factory pattern (Higher-Order Function for Middleware)
const checkApiPermission = (permission) => (req, res, next) => {
    const clientPermission = req.apiKeyInfo?.permission || [];
    if (!clientPermission.includes(permission)) {
        throw new ForbiddenRequestError("Permission denied");
    }
    next();
}

module.exports = {
    checkApiKey,
    checkApiPermission
}