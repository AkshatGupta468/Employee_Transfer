const nodemailer = require("nodemailer")
const pug = require("pug")
const htmlToText = require("html-to-text")
const mailjetTransport = require("nodemailer-mailjet-transport")
const { getModeForUsageLocation } = require("typescript")
module.exports = class Email {
  constructor(user, url) {
    ;(this.to = user.email),
      (this.firstName = user.name.split(" ")[0]),
      (this.url = url),
      (this.from = "Shikhar <${process.env.EMAIL_FROM}>")
  }
  newTransport() {
    if (process.env.NODE_ENV == "production") {
      //Mailjet
      return nodemailer.createTransport(
        mailjetTransport({
          auth: {
            apiKey: process.env.MAILJET_API_KEY,
            apiSecret: process.env.MAILJET_API_SECRET,
          },
        })
      )
    }
    //creating a transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  }
  //sending the mail
  async send(template, subject) {
    //rendering HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    })
    //Defining email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    }

    //Creating a transport and sending mail

    await this.newTransport().sendMail(mailOptions)
  }

  async sendWelcome() {
    await this.send(
      "welcome",
      "Thank you for registering on the Employee Transfer portal"
    )
  }
  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token(valid only for 10 minutes)"
    )
  }
}
