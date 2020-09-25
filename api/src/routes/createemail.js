const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

function sendEmail(email, message, res, next) {
    const mailOptions = {
      from: email,
      to: `anyemail@example.com`,
      subject: `Nodemailer test`,
      text: message,
    };
   
   transporter.sendMail(mailOptions, (err, info) => {
      if (err) return next(err);
   
      res.status(200).json({
        message: 'Email sent'
      });
   });
   }


   module.exports = {
    sendEmail: sendEmail,
   }