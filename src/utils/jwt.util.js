const JWT = require("jsonwebtoken");

const generateToken = (userId, privateKey) => {
    const accessToken = JWT.sign(
        { userId: userId },     // payload
        privateKey,                 // RSA private key
        {
            algorithm: "RS256",
            expiresIn: "1h"
        }
    );

    const refreshToken = JWT.sign(
        { userId: userId },
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: "7d"
        }
    );

    return { accessToken, refreshToken }
}

module.exports = generateToken;

