const { CREATED, OK } = require("../core/success.response");
const AccessService = require("../services/access.service");
const cookieResponse = require("../utils/cookieResponse.ultil")

class AccessController {
    static signUp = async (req, res, next) => {
        // response access token, refresh token to client
        const result = await AccessService.signUp(req.body);
        cookieResponse(res, result.refreshToken);

        new CREATED({
            message: "Registed new Shop",
            metadata: {
                user: result.user,
                accessToken: result.accessToken
            }
        }).send(res);
    }

    static login = async (req, res, next) => {
        const result = await AccessService.login(req.body);
        cookieResponse(res, result.refreshToken);

        new OK({
            message: "Login successful",
            metadata: {
                user: result.user,
                accessToken: result.accessToken
            }
        }).send(res);
    }
}

module.exports = AccessController;