const { BadRequestError } = require("../core/error.response");
const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    signUp = async (req, res, next) => {
        // response access token, refresh token to client
        const result = await AccessService.signUp(req.body);

        res.cookie("access_token", result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000      // 1h
        });
        res.cookie("refresh_token", result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000      // 7days
        });

        new CREATED({
            metadata: {
                user: result.user,
            }
        }).send(res);
    }
}

module.exports = new AccessController();