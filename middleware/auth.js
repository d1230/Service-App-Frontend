const passport = require("passport");
const UserToken = require("../models/userTokenModel");
const dbService = require("../utils/data-service");

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject('Unauthorized User');
  }
  req.user = user;
  let userToken = await dbService.findOne(UserToken,{
    token:(req.headers.authorization).replace('Bearer ',''),
    userId:user.id
  })
  if (!userToken){
    return reject('Token not found');
  }
  if (userToken.isTokenExpired){
    return reject('Token is Expired');
  }
  resolve();
};

const auth = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('ecom-rule', { session: false }, verifyCallback(req, resolve, reject))(
      req,
      res,
      next
    );
  })
    .then(() => next())
    .catch((err) => {
      return res.unAuthorizedRequest();
    });
}

module.exports = auth;