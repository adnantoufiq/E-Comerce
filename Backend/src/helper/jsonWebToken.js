const jwt = require('jsonwebtoken');

const createJsonWebToken = (payload, secretKey, expiresIn) => {

  if(typeof payload !== 'Object' || )
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

module.exports = {
  createJsonWebToken,
};
