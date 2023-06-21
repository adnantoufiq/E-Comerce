require("dotenv").config({
    path: `${__dirname}/.env`,
  });
  
const defaultImagePath = process.env.DEFAULT_IMAGE;
// console.log(defaultImagePath);

const appPort = process.env.APP_PORT || 3002
// console.log(APP_PORT)

const smtpUserName = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || ""
const frontEndUrl =  process.env.CLIENT_FRONTEND_URL || ""



module.exports={
    defaultImagePath,
    appPort,
    smtpUserName,
    smtpPassword,
    frontEndUrl
}