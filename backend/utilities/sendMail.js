const nodemailer = require("nodemailer");

module.exports = async(email, subject, message) => {

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            service: process.env.SMTP_SERVICE,
            //secure: Boolean(process.env.SMTP_SECURE),
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            text: message
        };

        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.log("Email not sent");
        console.log(error);
        return error;
    }
    
};