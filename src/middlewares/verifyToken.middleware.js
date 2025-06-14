const { HEADER } = require("../constant");
const { BadRequestError } = require("../core/error.response");
const { publicKey } = require("../utils/keyStore");
const verify = require("../utils/verify");

/*
    1. check header authorization missing
    2. get access token
    3. verify token
    4. attach decoded user payload to req
*/

const verifyToken = async (req, res, next) => {
    // 1. check header authorization missing
    const authHeader = req.headers[HEADER.AUTHORIZATION];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new BadRequestError("Authorization Header missing");
    }

    // 2. get access token
    const accessToken = authHeader.split(" ")[1];

    // 3. verify token
    const verified = verify(accessToken, publicKey);

    // 4. attach decoded user payload to req
    req.user = verified;
    next();
}

module.exports = verifyToken;