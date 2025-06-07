const AccessService = require("../services/access.service");

class AccessController {
    Signup = async (req, res, next) => {
        try {

            const result = await AccessService.signUp(req.body);

            // if register sussessfull, response access token, refresh token to client
            if (result.code == "SUCCESS") {
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
                // 200: OK
                // 201: CREATED
                return res.status(201).json({ message: result.message });
            }

            return res.status(400).json({
                code: result.code,
                message: result.message
            })

        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AccessController();