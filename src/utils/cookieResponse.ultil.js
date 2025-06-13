const cookieResponse = (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000      // 7days
    });
}

module.exports = cookieResponse;