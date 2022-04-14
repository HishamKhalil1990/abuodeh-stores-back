// import module
const nodemailer = require('nodemailer')

// declared variables
const emailService = "GMAIL" // email provider 
const fromEmail = "alertmsg.abuodeh1@gmail.com" // email sender user
const fromEmailPass = "Aa@123456" // email sender password

const sendEmail = async (text,subject,toEmail,res) => {
    const transporter = nodemailer.createTransport({
        service : emailService,
        auth : {
            user : fromEmail,
            pass : fromEmailPass
        }
    });
    const emailOptions = {
        from : fromEmail,
        to : toEmail,
        subject : subject,
        text : text,
    }
    transporter.sendMail(emailOptions,(error,info) => {
        if (error) throw error;
        res.send({msg : 'email was sent'})
    })
}

module.exports = sendEmail;