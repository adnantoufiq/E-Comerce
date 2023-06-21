const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../secret");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUserName, // generated ethereal user
    pass: smtpPassword, // generated ethereal password
  },
});

const sendEmailWithNodeMailer = async (emailDataSet) => {
  try {
    const mailOptions = {
      from: smtpUserName, // sender address
      to: emailDataSet.email, // list of receivers
      subject: emailDataSet.subject, // Subject line
      html: emailDataSet.html, // html body
    };

    const emailInformation = await transporter.sendMail(mailOptions);
    console.log(emailInformation.response);
  } catch (error) {
    console.error('email-send-failed:', error)
    throw error;
  }
};

module.exports = {
  sendEmailWithNodeMailer,
};
