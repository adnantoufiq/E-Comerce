const jwt = require('jsonwebtoken');
const _ = require('lodash')
const createJsonWebToken =  (payload, secretKey, expiresIn) => {

  if(!_.isObject(payload) || !payload){
    throw new Error('valid-non-empty-payload-required')
  }
  if(!_.isString(secretKey) || _.isEmpty(secretKey)){
    throw new Error('valid-not-empty-secretKey-is-required')
  }
  try {
    const token =  jwt.sign(payload, secretKey, { expiresIn });

    return token;
      
  } catch (err) {

    console.error('failed-to-create-jwt:', err)

    throw err
    
  }

};

module.exports = {
  createJsonWebToken,
};
