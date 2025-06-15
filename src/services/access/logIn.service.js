const bcrypt = require("bcrypt");
const { BadRequestError } = require("../../core/error.response");
const generateToken = require("../../utils/jwt.util");
const { privateKey } = require("../../utils/keyStore");
const { findByEmail } = require("../shop.service");
const { randomUUID } = require("crypto");
const { updateRedis } = require("./redis.service");

/*
    1. check email
    2. match password
    3. generate sessionId
    4. generate new tokens
    5. store refresh token in redis
    6. return user info and tokens
*/

const logIn = async ({ email, password }) => {
    // 1. check email
    const holeShop = await findByEmail({ email })
    if (!holeShop) {
        throw new BadRequestError();
    }

    // 2. match password
    const isMatch = await bcrypt.compare(password, holeShop.password);
    if (!isMatch) {
        throw new BadRequestError();
    }

    // 3. generate sessionId
    const sessionId = randomUUID();

    // 4. generate new tokens
    const { accessToken, refreshToken } = generateToken(holeShop._id, sessionId, privateKey);

    // 5. store refresh token in redis
    await updateRedis(
        holeShop._id.toString(),
        sessionId,
        refreshToken,
        60 * 60 * 24 * 7      // 7 days
    );

    // 6. return user info and tokens
    return {
        user: {
            userId: holeShop._id,
            name: holeShop.name,
            email: holeShop.email,
            role: holeShop.role
        },
        accessToken,
        refreshToken
    }
}


module.exports = logIn;