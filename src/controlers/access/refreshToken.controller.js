const { CREATED } = require("../../core/success.response");
const refreshToken = require("../../services/access/refreshToken.service");
const cookieResponse = require("../../utils/cookieResponse.ultil");

const refreshTokenController = async (req, res, next) => {
    const token = req.cookies.refreshToken;
    const result = await refreshToken(token);
    cookieResponse(res, result.refreshToken);

    return new CREATED({
        message: "Created new access token successful",
        metadata: {
            user: result.user,
            accessToken: result.accessToken
        }
    }).send(res);
}

module.exports = refreshTokenController;