const saveAdminCookie = (admin, res, statusCode) => {
    
    const token = admin.createJwtToken();

    const options = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 3 * 24 * 3600 * 1000)
    };

    res.status(statusCode).cookie("admin", token, options).send({
        admin,
        token
    });
};

module.exports = saveAdminCookie;