const { publicKey } = require("../../utils/keyStore");
const { BadRequestError } = require("../../core/error.response");
const verifyToken = require("../../utils/verifyToken.util");
const { addOldRefreshTokenToBlacklist, removeRefreshToken } = require("./redis.service");
/*
    1. verify token and extract payload
    2. remove refresh token from redis to revoke session
    3. add refresh token to blacklist
    4. return user info
 */

const logOut = async (refreshToken) => {
    // 1. verify token and extract payload
    const verified = verifyToken(refreshToken, publicKey);
    const { userId, sessionId } = verified;
    if (!userId || !sessionId) {
        throw new BadRequestError("Invalid token payload");
    }

    // 2. remove refresh token from redis to revoke session
    await removeRefreshToken(userId, sessionId);

    // 3. add refresh token to blacklist
    await addOldRefreshTokenToBlacklist(
        userId,
        refreshToken,
        60 * 60 * 24 * 7      // 7 days
    );

    // 4. return user info
    return {
        user: {
            userId: userId
        }
    }
}


module.exports = logOut;