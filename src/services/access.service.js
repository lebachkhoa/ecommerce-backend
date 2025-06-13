const { roleShop } = require("../constant/constant");
const bcrypt = require("bcrypt");
const { ConflictRequestError, BadRequestError, NotFoundRequestError } = require("../core/error.response");
const generateToken = require("../utils/jwt.util");
const { saveKeyToken, findByUserId, updateKeyToken } = require("./keytoken.service");
const { createShop, findByEmail } = require("./shop.service");
const { privateKey, publicKey } = require("../utils/keyStore");
const verify = require("../utils/verify");


class AccessService {
    /*
        
     */
    static logOut = async (username, password) => {

    }

    /*
        1. verify refresh token
        2. generate new token
        3. update new refresh token
    */
    static refreshAccessToken = async (refreshToken) => {
        // 1. verify refresh token
        const verified = verify(refreshToken, publicKey);

        // 2. generate new token
        const { accessToken, newRefreshToken } = generateToken(verified.userId, publicKey);

        // 3. update new refresh token
        const filter = { userId: verified.userId },
            update = {
                refreshToken: newRefreshToken,
                $set: { refreshTokensUsed: refreshToken }
            },
            option = { upsert: true, new: true }
        await updateKeyToken(filter, update, option);

        return {
            user: {
                userId: verified.userId,
                name: verified.name,
                email: verified.email,
                role: verified.role
            },
            accessToken,
            refreshToken
        }
    }

    /*
        1. check emal
        2. match password
        3. take public key, private key
        4. generate new tokens
        5. update new refresh token
    */
    static login = async ({ email, password }) => {
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

        // 3. find by userId in keytoken
        const keyStore = await findByUserId({ userId: holeShop._id })
        if (!keyStore) {
            throw new NotFoundRequestError();
        }

        // 4. generate new tokens
        const { accessToken, refreshToken } = generateToken(keyStore.userId, privateKey);

        // 5. update new refresh token
        const oldRefreshToken = keyStore.refreshToken;
        const filter = { userId: holeShop._id },
            update = {
                refreshToken,
                $set: { refreshTokensUsed: oldRefreshToken }
            },
            option = { upsert: true, new: true }
        await updateKeyToken(filter, update, option);

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

    /*
        1. check email
        2. create new user
        3. create public key, private key
        4. generate tokens
        5. save data to db, return
    */
    static signUp = async ({ name, email, password }) => {
        // 1. check email, if exists return
        const holeShop = await findByEmail({ email })
        if (holeShop) {
            throw new ConflictRequestError();
        }

        // 2. create new user
        const passwordHash = await bcrypt.hash(password, 10);
        const newShop = await createShop({ name, email, password: passwordHash, role: roleShop.SHOP });

        // 4. use private key to sign access token and refresh token
        const { accessToken, refreshToken } = generateToken(newShop._id, privateKey);

        // 5. save public key, refresh token to db
        await saveKeyToken({ userId: newShop._id, refreshToken });

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
}

module.exports = AccessService;