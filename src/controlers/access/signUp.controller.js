const { CREATED } = require("../../core/success.response");
const signUp = require("../../services/access/signUp.service");
const cookieResponse = require("../../utils/cookieResponse.ultil")


const signUpController = async (req, res, next) => {
    // response access token, refresh token to client
    const result = await signUp(req.body);
    cookieResponse(res, result.refreshToken);

    return new CREATED({
        message: "Registed new Shop",
        metadata: {
            user: result.user,
            accessToken: result.accessToken
        }
    }).send(res);
}


module.exports = signUpController;