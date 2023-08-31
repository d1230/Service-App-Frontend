/*
 * aps authentication - with passport
 */

const {
  Strategy, ExtractJwt 
} = require('passport-jwt');
const { JWT } = require('../constants/constants');
const User = require('../models/userModel');
const dbService = require('../utils/data-service');

module.exports = {
  apsPassportStrategy: passport => {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = JWT.APS_SECRET;
    passport.use('ecom-rule',
      new Strategy(options, (payload, done) => {
        dbService.findOne(User,{ id: payload.id }).then((user)=>{
          if (user) {
            return done(null, { ...user.toJSON() });
          }
          return done('No User Found', {});
        }).catch(err => done(err, false));
      })
    );
  }
};