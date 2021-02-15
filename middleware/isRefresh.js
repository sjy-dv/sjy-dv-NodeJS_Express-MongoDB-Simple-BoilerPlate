const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const { createToken } = require('../utils/jwt');

module.exports = async (req, res, next) => {
  try {
    const refreshtoken = req.get('r_x_auth');

    if (!refreshtoken) {
      return false;
    }

    const decodedToken = jwt.verify(refreshtoken, R_secretKey);
    const {username} = decodedToken;
    const rows = await Member.findOne({username});
    if(rows){
        const newtoken = createToken(rows[0].username);
        res.send(newtoken);
    }else{
        return false;
    }
  } catch (err) {
    next(err);
  }
};
