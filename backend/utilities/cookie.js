const saveCookie = (user, res, statusCode, isAdmin) => {
    
    const cookieName = isAdmin ? "admin" : "user";
    const token = user.createJwtToken();

    const options = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 3 * 24 * 3600 * 1000)
    };

    res.status(statusCode).cookie(cookieName, token, options).send({
        user,
        token
    });
};

module.exports = saveCookie;