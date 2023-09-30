const saveCookie = (user, res, statusCode) => {
    
    const token = user.createJwtToken();

    const options = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 3 * 24 * 3600 * 1000)
    };

    //username extraction
    const username = user.username;
    const email = user.email;

    res.status(statusCode).cookie("user", { email, username, token }, options).send({
        user,
        token,
        success: true
    });
};

module.exports = saveCookie;