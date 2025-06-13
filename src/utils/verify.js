const { BadRequestError } = require("../core/error.response");
const JWT = require("jsonwebtoken");

const verify = (token, key) => {
    try {
        const verified = JWT.verify(token, key, {
            algorithms: ["RS256"]
        });
        return verified;
    } catch (err) {
        throw new BadRequestError("Verify Token Fail");
    }
}


module.exports = verify;