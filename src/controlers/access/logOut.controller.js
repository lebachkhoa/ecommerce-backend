const { OK } = require("../../core/success.response");
const logOut = require("../../services/access/LogOut.service");

const LogOutController = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return new OK({ message: "No active session or already loged out" }).send(res);
    }
    await logOut(refreshToken);

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });

    return new OK({ message: "Logout successful" }).send(res);
}

module.exports = LogOutController;