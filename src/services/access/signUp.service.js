const { roleShop } = require("../../constant/constant");
const bcrypt = require("bcrypt");
const { ConflictRequestError } = require("../../core/error.response");
const generateToken = require("../../utils/jwt.util");
const { createShop, findByEmail } = require("../shop.service");
const { privateKey } = require("../../utils/keyStore");
const { randomUUID } = require("node:crypto");
const redisClient = require("../../redis/redisClient.util");


/*
    1. check email
    2. create new user
    3. create unique sessionId for this new session
    4. generate tokens
    5. save data to redis for session management
    6. return use infor and tokens 
*/

const signUp = async ({ name, email, password }) => {
    // 1. check email, if exists return
    const holeShop = await findByEmail({ email })
    if (holeShop) {
        throw new ConflictRequestError();
    }

    // 2. create new user
    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await createShop({ name, email, password: passwordHash, role: roleShop.SHOP });
    if (!newShop) {
        throw new Error("Failed to create new User");
    }

    // 3. create unique sessionId for this new session
    const sessionId = randomUUID();

    // 4. use private key to sign access token and refresh token
    const { accessToken, refreshToken } = generateToken(newShop._id, sessionId, privateKey);

    // 5. save refresh token to redis for session management, set expiry for refresh token
    const redisKey = `session:${newShop._id}:${sessionId}`;
    await redisClient.set(redisKey, refreshToken, { EX: 60 * 60 * 24 * 7 });             // 7 days

    return {
        user: {
            UserId: newShop._id,
            name: newShop.name,
            email: newShop.email,
            role: newShop.role
        },
        accessToken,
        refreshToken
    }
}


module.exports = signUp;