const nodemailer = require("nodemailer");

async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // mail details
  const mailOptions = {
    from: "<Daniel danztee@yahoo.com>",
    to: options.to,
    subject: options.subject,
    text: options.message,
  };

  // send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
