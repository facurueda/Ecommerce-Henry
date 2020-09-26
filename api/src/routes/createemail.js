const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
   service: 'gmail',
    /*  host: 'smtp.ethereal.email',
    port: 587, */
    /* secure: false, */
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});
//we create JSON object which will define the email structure
function sendEmail(email, message, res, next) {
    const mailOptions = {
      from: 'noreplylacoseria@gmail.com',
      to: `berenicehdm474@hotmail.com`,
      subject: `Nodemailer test`,
      text: 'thattt'
     
    };
   
   transporter.sendMail(mailOptions, (err, info) => {
      if (err){
          return console.log(err)
      } else {   
      res.status(200).json({
        message: 'Email sent'
      })};
   });
   }


   module.exports = {
    sendEmail: sendEmail,
   }