const User = require('../models/userModel');
const UserToken = require('../models/userTokenModel');
const dbService = require('../utils/data-service');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { JWT } = require('../constants/constants')

const userLogin = async (req, res) => {
  try {
    const data = {
      ...req.body
    };

    const user = await dbService.findOne(User, { email: data.email });
    if (!user) {
      return res.loginFailed({
        message: "Email not found!"
      });
    }

    const isPasswordMatched = await user.isPasswordMatch(data.password);
    if (!isPasswordMatched) {
      return res.loginFailed({
        message: "Wrong Password!"
      });
    }

    const userData = user.toJSON();
    let token;
    if (!user.role) {
      return res.loginFailed({
        message: "You have not assigned any role"
      });
    }
    token = await generateToken(userData, JWT.APS_SECRET);

    let expire = dayjs().add(JWT.EXPIRES_IN, 'second').toISOString();
    const tokenData = await dbService.createOne(UserToken, {
      userId: user.id,
      token: token,
      tokenExpiredTime: expire
    });
    let userToReturn = {
      ...userData,
      ...{ token }
    };

    return res.ok({ data: userToReturn });
  } catch (error) {
    return res.failureResponse();
  }
}

async function generateToken(user, secret) {
  return jwt.sign({
    id: user.id,
    'email': user.email,
    'role': user.role
  }, secret, { expiresIn: JWT.EXPIRES_IN * 60 });
}

const userRegister = async (req, res) => {
  try {
    const existingUser = await dbService.findOne(User, { email: req.body.email })
    if (existingUser) {
      return res.isDuplicate({
        message: "Email already registered"
      })
    }
    delete req.body["createdBy"];
    delete req.body["updatedBy"];
    delete req.body["role"];
    const data = {
      ...req.body,
      role: "user",
    };
    let result = await dbService.createOne(User, data);
    return res.ok({ message: "User is successfully registered" });
  } catch (error) {
    return res.failureResponse();
  }
}

const userLogout = async (req, res) => {
}

module.exports = {
  userLogin,
  userRegister,
  userLogout
}