const { OK } = require("../../core/success.response");
const logIn = require("../../services/access/logIn.service");
const cookieResponse = require("../../utils/cookieResponse.ultil")


const loginController = async (req, res, next) => {
    const result = await logIn(req.body);
    cookieResponse(res, result.refreshToken);

    return new OK({
        message: "Login successful",
        metadata: {
            user: result.user,
            accessToken: result.accessToken
        }
    }).send(res);
}


module.exports = loginController;