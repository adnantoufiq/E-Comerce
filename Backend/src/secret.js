require("dotenv").config({
    path: `${__dirname}/.env`,
  });
  
const defaultImagePath = process.env.DEFAULT_IMAGE;
console.log(defaultImagePath);

const APP_PORT = process.env.APP_PORT
console.log(APP_PORT)


module.exports={
    defaultImagePath,
    APP_PORT,
}