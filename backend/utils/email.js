const nodemailer = require("nodemailer");
const { getModeForUsageLocation } = require("typescript");

const sendEmail = async (options) => {
  //creating a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //Defining the email options
  const mailOptions = {
    from: "Shikhar ",
    to: options.email,
    text: options.message,
  };
  //Sending the mail
  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
