const { roleShop } = require("../constant/constant");
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");
const keytokenModel = require("../models/keytoken.model");
const { ConflictRequestError } = require("../core/error.response");

class AccessService {
    static signUp = async ({ name, email, password }) => {
        // check email, if exists return
        const hodelShop = await shopModel.findOne({ email }).lean();
        if (hodelShop) {
            throw new ConflictRequestError();
        }

        // create new user
        const passwordHash = await bcrypt.hash(password, 10);
        const newShop = await shopModel.create({ name, email, password: passwordHash, role: [roleShop.SHOP] });

        // if create new user error, return
        if (!newShop || newShop == null) {
            throw new ConflictRequestError();
        }

        // if create new user sussessful, create private key and public key
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });
        console.log({ publicKey, privateKey });

        // use private key to sign access token and refresh token
        const accessToken = JWT.sign(
            { userId: newShop._id },     // payload
            privateKey,                 // RSA private key
            {
                algorithm: "RS256",
                expiresIn: "1h"
            }
        );
        const refreshToken = JWT.sign(
            { userId: newShop._id },
            privateKey,
            {
                algorithm: "RS256",
                expiresIn: "7d"
            }
        );
        console.log({ accessToken, refreshToken });

        // save public key, refresh token to db
        const publicKeyString = publicKey.toString();
        await keytokenModel.create({
            user: newShop._id,
            publicKey: publicKeyString,
            refreshToken: [refreshToken]
        });

        return {
            code: "SUCCESS",
            message: "Register successful",
            user: {
                id: newShop._id,
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