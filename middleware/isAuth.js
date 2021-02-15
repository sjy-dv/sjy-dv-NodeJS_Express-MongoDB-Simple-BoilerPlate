const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
require('dotenv').config();
const secretKey = process.env.ACCESS_KEY;

module.exports = async (req, res, next) => {
  try {
    const token = req.get('x_auth');
    const decodedToken = jwt.verify(token, secretKey);
    const {username } = decodedToken;
    const rows = await Member.findOne({username});
    if(!rows){
        return false;
    }
    next();
  } catch (err) {
    next(err);
  }
};
