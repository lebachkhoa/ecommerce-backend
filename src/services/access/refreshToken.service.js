const { BadRequestError } = require("../../core/error.response");
const generateToken = require("../../utils/jwt.util");
const { publicKey, privateKey } = require("../../utils/keyStore");
const verifyToken = require("../../utils/verifyToken.util");
const { isTokenMatch, isTokenReused, addOldRefreshTokenToBlacklist, updateRedis } = require("./redis.service");

/*
    1. verify refresh token and extract payload
    2. check if old refresh token matchs the one saved in Redis for that session
    3. check if refresh token reused
    4. generate new token
    5. update new refresh token in redis
    6. blacklist oldRefresh token to prevent reuse
    7. return user info and tokens
*/

const refreshToken = async (oldRefreshToken) => {
    // 1. verify refresh token and extract payload
    const verified = verifyToken(oldRefreshToken, publicKey);
    const { userId, sessionId } = verified;
    if (!userId || !sessionId) {
        throw new BadRequestError("Invalid token payload or missing userId/sessionId");
    }

    // 2. check if old refresh token matchs the one saved in Redis for that session
    await isTokenMatch(userId, sessionId, oldRefreshToken);

    // 3. check if refresh token reused
    await isTokenReused(userId, sessionId, oldRefreshToken);

    // 4. generate new token
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateToken(userId, sessionId, privateKey);

    // 5. update new refresh token in redis
    await updateRedis(
        userId,
        sessionId,
        newRefreshToken,
        60 * 60 * 24 * 7      // 7 days
    );

    // 6. blacklist old refresh token to prevent reuse
    await addOldRefreshTokenToBlacklist(
        userId,
        oldRefreshToken,
        60 * 60 * 24 * 7      // 7 days
    );

    // 7. return user info and tokens
    return {
        user: {
            userId,
            sessionId,
        },
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}


module.exports = refreshToken;